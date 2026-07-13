import express, { urlencoded } from 'express'
import errorHandler from './middlewares/errorHandler.js'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import jobRouter from './routes/job.routes.js'
import queueRouter from './routes/queue.routes.js'
import dlqRouter from './routes/dlq.routes.js'
import workerRoute from './routes/worker.routes.js'
import replayRouter from './routes/replay.route..js'
import healthRoutes from "./routes/health.routes.js";


const app = express()

app.use(cors())
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));

app.use("/jobs", jobRouter);
app.use('/queue', queueRouter);
app.use('/dlq', dlqRouter);
app.use('/worker',workerRoute);
app.use('/deadletter', replayRouter)
app.use("/health", healthRoutes);

app.use(errorHandler);

export default app;