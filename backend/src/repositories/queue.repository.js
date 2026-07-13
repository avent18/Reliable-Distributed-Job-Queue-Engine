import prisma from "../config/prisma.js";

export const getQueueStats = async () => {
  const [pending, processing, completed, failed, deadLetter, workers] =
    await Promise.all([  //instead of counting one by one we asked psql to count all concurrentlly
      prisma.job.count({
        where: {
          status: "PENDING",
        },
      }),

      prisma.job.count({
        where: {
          status: "PROCESSING",
        },
      }),

      prisma.job.count({
        where: {
          status: "COMPLETED",
        },
      }),

      prisma.job.count({
        where: {
          status: "DEAD_LETTER",
        },
      }),

      prisma.job.count({
        where: {
          status: "FAILED",
        },
      }),

      prisma.worker.count({
        where: {
          status: "ONLINE",
        },
      }),
    ]);

    return {
        pending,
        processing,
        completed,
        failed,
        deadLetter,
        workers
    };
};


export const getQueueByStats = async (status)=>{
  return await prisma.job.findMany({
    where:{
      status
    },
    orderBy:{
      createdAt: "desc"
    }
  })
}