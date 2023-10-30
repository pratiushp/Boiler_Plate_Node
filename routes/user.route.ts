import express from "express";
import {
  getAllUser,
  getUserbyID,
  userDelete,
} from "../controllers/user.controller";

const router = express.Router();

router.put("/delete/:id", userDelete);
router.get("/", getAllUser);
router.get("/:id", getUserbyID);

export default router;
