import express from "express";

import {
  startSession,
  pauseSession,
  resumeSession,
  stopSession,
  updateSession,
  getAllSession,
  deleteSession,
  getSingleSession,
} from "../controllers/SessionControllers.js";
const router = express.Router();

router.post("/start", startSession); // ▶️ Start timer
router.put("/pause/:id", pauseSession); // ⏸️ Pause timer
router.put("/resume/:id", resumeSession); // ▶️ Resume timer
router.put("/stop/:id", stopSession); // ⏹️ Stop timer

router.get("/", getAllSession);               // 📋 Get all sessions
router.get("/:id", getSingleSession);                // 📄 Get single session
router.put("/:id", updateSession);             // ✏️ Edit topic/description
router.delete("/:id", deleteSession); 

export default router;