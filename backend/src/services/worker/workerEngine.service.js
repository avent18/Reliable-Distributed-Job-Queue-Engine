import { processJob } from "./processor.service.js";
import { claimNextJobService } from "./lease.service.js";
import { dependenciesSatisfied } from "../Jobs/dependency.service.js";
import logger from "../../config/logger.js";

export const runWorkerCycle = async (workerId) => {
  const job = await claimNextJobService(workerId);

  if (!job) {
    return;
  }
  logger.info(`processing job ${job.id}`);

  const dependencyReady = await dependenciesSatisfied(job.id);

  if (!dependencyReady) {
    logger.info(`Job ${job.id} waiting for dependencies`);

    await releaseJobForLater(job.id);

    return;
  }

  const result = await processJob(job);

  switch (result) {
    case "COMPLETED":
      logger.info(`Job ${job.id} completed`);
      break;

    case "RETRY":
      logger.warn(`Job ${job.id} scheduled for retry`);
      break;

    case "DEAD_LETTER":
      logger.error(`Job ${job.id} moved to Dead Letter Queue`);
      break;

    case "SKIPPED":
      logger.info(`Job ${job.id} already processed`);
      break;

    default:
      logger.warn(`Unknown job result: ${result}`);
  }
};

//this is how brain engine works for worker
//you can late add whateve u want, this is how orchestation layers work
