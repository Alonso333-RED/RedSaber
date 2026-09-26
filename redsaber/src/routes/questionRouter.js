import express from "express";
import questionController from "../controllers/questionController.js";

const router = express.Router();

router.get("/questions", questionController.getAllQuestions)
router.get("/questions/:id", questionController.getQuestionById)

export default router;