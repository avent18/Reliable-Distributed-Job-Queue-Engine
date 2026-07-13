import { replayDeadLetterJob } from "../../repositories/dlq.repository.js"
import { emitJobReplay } from "../../events/queueEvents.js";


export const replayJobService = async(jobId)=>{
  const updatedJob = await replayDeadLetterJob(jobId);
  await emitJobReplay(updatedJob)
}