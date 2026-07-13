import { getQueueStats } from "../../repositories/queue.repository.js"


export const getQueueStatsService = async()=>{
  return await getQueueStats();
}