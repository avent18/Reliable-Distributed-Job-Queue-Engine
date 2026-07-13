import { getExpiredLeases, releaseLease } from "../../repositories/lease.repository.js"
import { emitJobRecovered } from "../../events/queueEvents.js";


export const recoverExpiredJobs = async()=>{
  const expiredJobs = await getExpiredLeases();

  for(const lease of expiredJobs){
    const updatedJob = await releaseLease(lease);
    await emitJobRecovered(updatedJob);
  }
}