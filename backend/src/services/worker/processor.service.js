import { completeJob, retryJob } from "../../repositories/job.repository.js";
import { deadLetterService } from "../dlq/deadLetter.service.js";
import { getBackOffDelay } from "../../utils/exponentialBackoff.js";
import { emitJobRetry, emitJobDeadLetter, emitJobCompleted } from "../../events/queueEvents.js";
import { reserveProcessing } from "../idempotency/idempotency.service.js";



export const processJob = async (job) => {
  try {
    const reservation = await reserveProcessing(job);

    if (!reservation) {
      await completeJob(job.id);

      return "SKIPPED";
    }

    console.log(`Executing ${job.type}`);

    await new Promise((resolve) => setTimeout(resolve, 30000));

    // const failed = Math.random() < 0.5;
    const failed = false;

    if (failed) {
      throw new Error("Simulated Failure");
    }
    

    const updatedJob = await completeJob(job.id);

    await emitJobCompleted(updatedJob);

    return "COMPLETED";
  } catch (error) {
    const attempts = job.attempts + 1;

    if (attempts >= job.maxAttempts) {
      const dlqJob = await deadLetterService(job, error);
      await emitJobDeadLetter(dlqJob);

      return "DEAD_LETTER";
    }

    const delay = getBackOffDelay(attempts);

    const updatedJob = await retryJob(job.id, attempts, delay);

    await emitJobRetry({
    ...updatedJob,
    attempts
});

    return "RETRY";
  }
};
