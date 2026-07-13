import { getQueueByStats } from "../../repositories/queue.repository.js";

export const getJobsByStatusService = async(status)=>{
  return await getQueueByStats(status);
}