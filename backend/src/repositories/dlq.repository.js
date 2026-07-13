
import prisma from "../config/prisma.js";

export const moveToDeadLetterQueue = async (job, reason, stack = null) => {
  return prisma.$transaction(async (tx) => {
    return await tx.deadLetterJob.create({
      data: {
        jobId: job.id,
        failureReason: reason,
        failureStack: stack,
      },
    });

    return await tx.job.update({
      where: {
        id: job.id,
      },
      data: {
        status: "DEAD_LETTER",
      },
    });

    return await tx.jobLease.delete({
      where: {
        jobId: job.id,
      },
    });
  });
};

export const replayDeadLetterJob = async (jobId) => {
  return prisma.$transaction(async (tx) => {
    const dlq = await tx.deadLetterJob.findUnique({
      where: {
        jobId,
      },
    });

    if (!dlq) {
      throw new Error("job not found in dlq");
    }

    await tx.deadLetterJob.update({
      where: {
        id: jobId,
      },
      data: {
        status: "PENDING",
        attempts: 0,
        availableAt: new Date(),
        completedAt: null,
      },
    });

    await tx.deadLetterJob.delete({
      where:{
        jobId
      }
    })
  });
};