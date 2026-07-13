import ApiError from "../utils/ApiError.js";

export const jobValidation = async(req, res, next)=>{
  const {type, payload} = req.body;
  if(!type){
    return next(ApiError(400, "Job type is required"))
  }
  if(payload==undefined || payload == null){
    return next(ApiError(400, "Job payload is required"));
  }
  next();
}