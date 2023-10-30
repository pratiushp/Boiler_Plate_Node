import express from "express";
import {
  forgetPassword,
  loginController,
  registerController,
  resetPassword,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);

export default router;
