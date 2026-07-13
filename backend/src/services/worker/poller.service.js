import { getNextAvailableJob } from "../../repositories/worker.repository.js"


export const pollJob = async()=>{
  return await getNextAvailableJob();
}