import { moveToDeadLetterQueue } from "../../repositories/dlq.repository.js";
import { replayDeadLetterJob } from "../../repositories/dlq.repository.js";


export const deadLetterService = async(job, error)=>{
  return await moveToDeadLetterQueue(job, error.message, error.stack);
}


export const replayDeadLetterService = async (jobId) => {
  return await replayDeadLetterJob(jobId);
};