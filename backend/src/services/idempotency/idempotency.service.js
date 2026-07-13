import { reserveIdempotencyKey } from "../../repositories/idempotency.repository.js"



export const reserveProcessing = async(job)=>{
  return await reserveIdempotencyKey(job);
}