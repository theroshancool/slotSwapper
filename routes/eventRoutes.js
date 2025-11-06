import express from "express";
import { createEvent, getMyEvents, updateEvent, deleteEvent } from "../controllers/eventController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createEvent);
// router.get("/", authMiddleware, getAllEvents);
router.get("/:id", authMiddleware, getMyEvents);
router.put("/:id", authMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);

export default router;
