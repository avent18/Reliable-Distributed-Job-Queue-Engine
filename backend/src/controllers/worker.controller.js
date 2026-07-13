import { getAllWorkersService } from "../services/worker/getAllWorkers.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAllWorkersController = asyncHandler(async (req, res) => {
    const workers = await getAllWorkersService();

    res.status(200).json({
        success: true,
        data: workers,
    });
});