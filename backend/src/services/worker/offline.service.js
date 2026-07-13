import {
  getInactiveWorkers,
  markWorkerOffline,
} from "../../repositories/worker.repository.js";

export const offlineWorkerService = async () => {
  const workers = await getInactiveWorkers();

  for (const worker of workers) {
    await markWorkerOffline(worker.id);
  }

  return workers.length;
};