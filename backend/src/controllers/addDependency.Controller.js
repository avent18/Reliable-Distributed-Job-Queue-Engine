import { addDependencyService } from "../services/Jobs/dependency.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";



export const addDependencyController = asyncHandler(async(req, res)=>{
   const {jobId} = req.params;
   const {dependsOnJobId} = req.body;

   const job = await addDependencyService(jobId, dependsOnJobId)

   return res.status(201).json(new ApiResponse(201, "new dependency added"));
})