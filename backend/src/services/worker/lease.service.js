import { claimNextJob } from "../../repositories/lease.repository.js"
import { emitJobClaimed } from "../../events/queueEvents.js";


export const claimNextJobService = async(workerId)=>{
  const job =  await claimNextJob(workerId);
  if(job){
   await emitJobClaimed(job);
}
return job;
}