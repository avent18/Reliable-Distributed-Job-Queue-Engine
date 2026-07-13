import { createJobService } from "../services/Jobs/createJob.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


export const createJobController = asyncHandler(async(req, res)=>{
  const job = await createJobService(req.body)
  return res.status(201).json(new ApiResponse(
    201,
    "new Job created",
    job
  ));
})