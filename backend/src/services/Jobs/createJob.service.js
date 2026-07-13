import { createJob } from "../../repositories/job.repository.js"
import { emitJobCreated } from "../../events/queueEvents.js";


export const createJobService = async(jobData)=>{
   const job = await createJob(jobData);
   await emitJobCreated(job);
   return job;
}