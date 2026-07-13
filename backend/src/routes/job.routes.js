import express from 'express'
import { jobValidation } from '../validations/job.validation.js';
import { createJobController } from '../controllers/createJob.Controller.js';
import { addDependencyController } from '../controllers/addDependency.Controller.js';
import { getAllJobsController } from '../controllers/getAllJobsController.js';

const jobRouter = express.Router();


jobRouter.post('/createjob', jobValidation, createJobController);
jobRouter.post('/:jobId/dependencies', addDependencyController);
jobRouter.get("/getall", getAllJobsController)


export default jobRouter;