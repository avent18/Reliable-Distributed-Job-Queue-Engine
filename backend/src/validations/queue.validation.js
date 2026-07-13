import ApiError from "../utils/ApiError.js";

const allowedStatuses = [
    "PENDING",
    "PROCESSING",
    "COMPLETED",
    "FAILED",
    "DEAD_LETTER"
];

export const validateQueueStatus = (req, res, next) => {

    const { status } = req.params;

    if (!allowedStatuses.includes(status)) {
        return next(
            new ApiError(400, "Invalid job status")
        );
    }

    next();
};