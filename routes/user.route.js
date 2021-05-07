import express from "express";
import { DashboardController } from "../controllers/majors/dashboard.controller";
import UserUtils from "../controllers/middleware/user";
const { ValidateUser } = UserUtils;
export const router = express.Router();

router.get("/dashboard", ValidateUser, DashboardController);
