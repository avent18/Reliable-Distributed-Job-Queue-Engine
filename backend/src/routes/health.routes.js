import express from "express";
import { healthController } from "../controllers/health.controller.js";

const healthRoutes = express.Router();

healthRoutes.get("/", healthController);

export default healthRoutes;