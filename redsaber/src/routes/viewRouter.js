import express from "express";
import questionService from "../services/questionService.js";
import answerService from "../services/answerService.js";
import userService from "../services/userService.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const allQuestions = await questionService.getAllQuestions();
    const allAnswers = await answerService.getAllAnswers();
    const users = await userService.getAllUsers();

    const questions = allQuestions
        .map(q => ({
            ...q,
            author: users.find(u => u.id_user === q.author_id)?.username,
            date: new Date(q.created_at).toLocaleDateString("es-CL"),
            answersCount: allAnswers.filter(
                a => Number(a.question_id) === Number(q.id_question)
            ).length
        }))
        .sort((a, b) => b.id_question - a.id_question);

    res.render("home", { questions });
});

router.get("/pregunta/:id", async (req, res) => {
    const question = await questionService.getQuestionById(req.params.id);

    if (!question) {
        return res.status(404).send("Pregunta no encontrada");
    }

    const author = await userService.getUserById(question.author_id);
    const allAnswers = await answerService.getAllAnswers();
    const users = await userService.getAllUsers();

    const answers = allAnswers
        .filter(a => Number(a.question_id) === Number(question.id_question))
        .map(a => ({
            ...a,
            author: users.find(u => u.id_user === a.author_id)?.username
        }));

    res.render("question", { question, author, answers });
});

export default router;