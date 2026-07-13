import publisher from "../redis/publisher.js";

const publishEvent = async (event, data) => {
    await publisher.publish("QUEUE_EVENTS",
        JSON.stringify({
            event, 
            data,
            timestamp: new Date().toISOString()
        })
    )
}

export const emitJobCreated = (job) => {
    publishEvent("JOB_CREATED", job);
};

export const emitJobClaimed = (job) => {
    publishEvent("JOB_CLAIMED", job);
};

export const emitJobCompleted = (job) => {
    publishEvent("JOB_COMPLETED", job);
};

export const emitJobRetry = (job) => {
    publishEvent("JOB_RETRY", job);
};

export const emitJobDeadLetter = (job) => {
    publishEvent("JOB_DEAD_LETTER", job);
};

export const emitJobReplay = (job) => {
    publishEvent("JOB_REPLAY", job);
};

export const emitJobRecovered = (job) => {
    publishEvent("JOB_RECOVERED", job);
};

export const emitWorkerRegistered = (worker) => {
    publishEvent("WORKER_REGISTERED", worker);
};