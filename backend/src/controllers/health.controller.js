import asyncHandler from "../utils/asyncHandler.js";
import { healthService } from "../services/health/health.service.js";

export const healthController = asyncHandler(async (req, res) => {
  const health = await healthService();

  res.status(200).json({
    success: true,
    data: health,
  });
});