/** @format */

import prisma from "../config/prisma.js";

const LEASE_DURATION = 30; // seconds

export const claimNextJob = async (workerId) => {
  return await prisma.$transaction(async (tx) => {
    //we have done this bcz prisma does not support locks , but postgres does, so that two workers may not hold of first job
    //bcs transactions doesn't automatically lock itself when u read them
    const jobs = await tx.$queryRaw`
    SELECT * FROM "Job"
    WHERE status = 'PENDING'
    AND "availableAt" <= NOW()
    ORDER BY priority DESC, "createdAt" ASC
    FOR UPDATE SKIP LOCKED 
    LIMIT 1`;
    //if one is locked , other one wil skip it , this "for updat skip locked" gives us
    // No duplicate processing
    //True multi-worker safety
    //Production-level implementation
    //A great interview talking point

    if (jobs.length === 0) {
      return;
    }

    const job = jobs[0];

    await tx.jobLease.create({
      data: {
        jobId: job.id,
        workerId,
        leasedUntil: new Date(Date.now() + LEASE_DURATION * 1000)
      },
    });

    const claimedJob = await tx.job.update({
      where: {
        id: job.id,
      },
      data: {
        status: "PROCESSING",
      },
    });

    return claimedJob;

    //this whole operatin will be a atomic operation
  });
};

export const releaseLease = async (lease) => {
  return await prisma.$transaction(async (tx) => {

    const updatedJob = await tx.job.update({
      where: {
        id: lease.jobId,
      },
      data: {
        status: "PENDING",
      },
    });

    await tx.jobLease.delete({
      where: {
        jobId: lease.jobId,
      },
    });

    return updatedJob;
  });
};

export const getExpiredLeases = async () => {
  return await prisma.jobLease.findMany({
    where: {
      leasedUntil: {
        lte: new Date(),
      },
    },
    include: {
      job: true,
    },
  });
};

// export const recoverLease = async (lease) => {
//   //atomic operations
//   return await prisma.$transaction(async (tx) => {
//     await tx.job.update({
//       where: {
//         jobId: lease.id,
//       },
//       data: {
//         status: "PENDING",
//       },
//     });

//     await tx.jobLease.delete({
//       where: {
//         jobId: lease.id,
//       },
//     });
//   });
// };
