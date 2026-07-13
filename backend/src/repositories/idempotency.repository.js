import prisma from "../config/prisma.js"

export const reserveIdempotencyKey = async (job) => {

    try {

        return await prisma.processedJob.create({
            data: {
                jobId: job.id,
                idempotencyKey: job.id
            }
        });

    } catch (error) {

        if (error.code === "P2002") {
            return null;
        }

        throw error;
    }

};