import express from 'express';
import { getAllWorkersController } from '../controllers/worker.controller.js';

const workerRoute = express.Router();

workerRoute.get('/getWorkers', getAllWorkersController);

export default workerRoute;