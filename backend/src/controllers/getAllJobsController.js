import { getAllJobsService } from "../services/Jobs/getAllJobs.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAllJobsController = asyncHandler(async (req, res) => {
    const jobs = await getAllJobsService();

    res.status(200).json({
        success: true,
        data: jobs,
    });
});