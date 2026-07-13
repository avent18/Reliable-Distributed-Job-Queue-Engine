import prisma from "../config/prisma.js";

export const registerWorker = async (workerName) => {
  return await prisma.worker.create({
    data: {
      name: workerName,
    },
  });
};

export const getNextAvailableJob = async () => {
  return await prisma.job.findFirst({
    where: {
      status: "PENDING",
      availableAt: {
        lte: new Date(),
      },
    },
    orderBy: [
      {
        priority: "desc",
      },
      {
        createdAt: "asc",
      },
    ],
  });
};


export const getAllWorkers = async () => {
    return await prisma.worker.findMany({
        orderBy: {
            startedAt: "desc",
        },
    });
};

export const updateWorkerHeartbeat = async (workerId) => {
  return await prisma.worker.update({
    where: {
      id: workerId,
    },
    data: {
      lastHeartbeat: new Date(),
    },
  });
};

export const getInactiveWorkers = async () => {
  return await prisma.worker.findMany({
    where: {
      status: "ONLINE",
      lastHeartbeat: {
        lte: new Date(Date.now() - 30000), // 30 sec
      },
    },
  });
};

export const markWorkerOffline = async (workerId) => {
  return await prisma.worker.update({
    where: {
      id: workerId,
    },
    data: {
      status: "OFFLINE",
    },
  });
};

export const getOnlineWorkersCount = async () => {
  return await prisma.worker.count({
    where: {
      status: "ONLINE",
    },
  });
};