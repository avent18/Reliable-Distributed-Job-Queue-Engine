import { releaseLease } from "../../repositories/lease.repository.js"


export const releaseLeaseService = async(jobId)=>{
  await releaseLease(jobId);
}