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

router.get("/preguntar", async (req, res) => {
    const users = await userService.getAllUsers();
    res.render("new-question", { users });
});

router.post("/preguntar", async (req, res) => {
    const { title, content, author_id } = req.body;

    if (!title?.trim() || !content?.trim() || !author_id) {
        const users = await userService.getAllUsers();
        return res.status(400).render("new-question", {
            users,
            title,
            content,
            error: "Completa todos los campos"
        });
    }

    const id = await questionService.createQuestion(
        title.trim(),
        content.trim(),
        author_id
    );

    res.redirect(`/pregunta/${id}`);
});

router.get("/registro", (req, res) => {
    res.render("register", { ok: req.query.ok });
});

router.post("/registro", async (req, res) => {
    const { username, password } = req.body;

    if (!username?.trim() || !password || password.length < 6) {
        return res.status(400).render("register", {
            username,
            error: "Escribe un usuario y una contraseña de mínimo 6 caracteres"
        });
    }

    try {
        await userService.registerUser(username.trim(), password);
        res.redirect("/registro?ok=1");
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).render("register", {
                username,
                error: "Ese usuario ya existe"
            });
        }
        console.error(error);
        res.status(500).render("register", {
            username,
            error: "Error al crear la cuenta"
        });
    }
});

export default router;