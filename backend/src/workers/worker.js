import crypto from "crypto";
import { registerWorkerService } from "../services/worker/registerWorker.service.js";
import logger from "../config/logger.js";
import { runWorkerCycle } from "../services/worker/workerEngine.service.js";
import { heartbeatService } from "../services/worker/heartbeat.service.js";
import { markWorkerOffline } from "../repositories/worker.repository.js";

const WORKER_NAME = `worker-${crypto.randomUUID().slice(0, 8)}`;

const startWorker = async () => {
  try {
    const worker = await registerWorkerService(WORKER_NAME);
    logger.info(`${worker.name} registered successfully`);

    setInterval(async () => {
  try {
    await heartbeatService(worker.id);
  } catch (error) {
    logger.error(error);
  }
}, 10000);

    setInterval(async () => {
      await runWorkerCycle(worker.id)
    }, 1000);

    process.on("SIGINT", async () => {
  await markWorkerOffline(worker.id);
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await markWorkerOffline(worker.id);
  process.exit(0);
});
  } catch (error) {
    logger.error(error);
  }
};
startWorker();
