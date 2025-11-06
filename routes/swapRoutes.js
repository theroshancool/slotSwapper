import express from "express";
import { getSwappableSlots, createSwapRequest, respondToSwap } from "../controllers/swapController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/swappable-slots", authMiddleware, getSwappableSlots);
router.post("/swap-request", authMiddleware, createSwapRequest);
router.post("/swap-response/:id", authMiddleware, respondToSwap);

export default router;
