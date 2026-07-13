import logger from "../config/logger.js";
import { recoverExpiredJobs } from "../services/worker/recovery.service.js";
import { offlineWorkerService } from "../services/worker/offline.service.js";


const startRecoveryWorker = async()=>{
  logger.info("Recovery Worker Started");

  setInterval(async () => {
  try {
    await recoverExpiredJobs();

    const offlineWorkers = await offlineWorkerService();

    if (offlineWorkers > 0) {
      logger.info(`${offlineWorkers} worker(s) marked OFFLINE`);
    }

  } catch (error) {
    logger.error(error);
  }
}, 5000);
}
startRecoveryWorker();