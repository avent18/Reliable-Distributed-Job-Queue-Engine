import { replayJobService } from "../services/dlq/replay.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { replayDeadLetterService } from "../services/dlq/deadLetter.service.js";



export const replayDeadLetterJobController = asyncHandler(async(req, res)=>{
  const {jobId} = req.params;

  await replayJobService(jobId);

  return res.status(200).json(new ApiResponse(200, "job replaid successfully"));
})

export const replayDeadLetterController = asyncHandler(async (req, res) => {

    const job = await replayDeadLetterService(req.params.jobId);

    return res.status(200).json({
        success: true,
        data: job
    });

});