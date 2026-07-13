import prisma from "../../config/prisma.js";
import publisher from "../../redis/publisher.js";
import { getOnlineWorkersCount } from "../../repositories/worker.repository.js";

export const healthService = async () => {
  await prisma.$queryRaw`SELECT 1`;

  const redis = await publisher.ping();

  const workers = await getOnlineWorkersCount();

  return {
    status: "healthy",
    database: "connected",
    redis: redis === "PONG" ? "connected" : "disconnected",
    workers,
    timestamp: new Date(),
  };
};