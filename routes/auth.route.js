import express from "express";
import {
  RegistrationController,
  LoginController,
} from "../controllers/majors/auth.controller";
export const router = express.Router();

router.post("/login", LoginController);
router.post("/register", RegistrationController);
