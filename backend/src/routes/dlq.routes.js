import express from 'express'
import { replayDeadLetterJobController } from '../controllers/dlq.controller.js';


const dlqRouter = express.Router();

dlqRouter.get('/:jobId/replay', replayDeadLetterJobController);

export default dlqRouter;