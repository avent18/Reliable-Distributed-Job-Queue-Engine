import { getAllJobs } from "../../repositories/job.repository.js";

export const getAllJobsService = async () => {
    return await getAllJobs();
};