import { updateWorkerHeartbeat } from "../../repositories/worker.repository.js";

export const heartbeatService = async (workerId) => {
  return await updateWorkerHeartbeat(workerId);
};