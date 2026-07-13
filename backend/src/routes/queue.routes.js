import express from 'express';
import { getJobsByStatusController, getQueueStatsController } from '../controllers/queue.controller.js';
import { validateQueueStatus } from "../validations/queue.validation.js";


const queueRouter = express.Router();

queueRouter.get('/stats', getQueueStatsController);
queueRouter.get('/:status', validateQueueStatus, getJobsByStatusController);

export default queueRouter;