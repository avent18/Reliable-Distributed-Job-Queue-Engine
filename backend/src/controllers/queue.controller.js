import { getJobsByStatusService } from "../services/queue/jobStatus.service.js";
import { getQueueStatsService } from "../services/queue/stats.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


export const getQueueStatsController = asyncHandler(async(req, res)=>{
  const stats = await getQueueStatsService();

  return res.status(200).json(new ApiResponse(200, "Qeueue Statstics fetched successfully", stats));
})

export const getJobsByStatusController = asyncHandler(async(req, res)=>{
  const {status} = req.params;

  const jobs = await getJobsByStatusService(status)

  return res.status(200).json(new ApiResponse(200, `${status} fetched by successfully`, jobs))
})