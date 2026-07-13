import express from 'express'
import { replayDeadLetterController } from '../controllers/dlq.controller.js';

const replayRouter = express.Router();


replayRouter.post('/replay/:jobId', replayDeadLetterController)

export default replayRouter;