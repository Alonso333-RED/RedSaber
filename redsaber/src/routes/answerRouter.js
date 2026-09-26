import express from "express";
import answerController from "../controllers/answerController.js";

const router = express.Router();

router.get("/answers", answerController.getAllAnswers)
router.get("/answers/:id", answerController.getAnswerById)

export default router;