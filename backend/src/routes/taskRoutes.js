import express from "express";
import {
  createTask,
  getTasks,
  updateTaskStatus,
  getTeamSnapshot,
} from "../controllers/taskController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getTasks);
router.get("/team/snapshot", authorizeRoles("admin"), getTeamSnapshot);
router.post("/", authorizeRoles("admin"), createTask);
router.patch("/:taskId", updateTaskStatus);

export default router;

