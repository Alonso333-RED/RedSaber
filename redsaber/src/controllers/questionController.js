import questionService from "../services/questionService.js";

async function getAllQuestions(req, res) {
    try {
        const allQuestions = await questionService.getAllQuestions();

        console.log("Preguntas:", allQuestions);

        return res.status(200).json({
            message: "Todas las preguntas",
            allQuestions
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Error al encontrar todas las preguntas"
        });
    }
}

async function getQuestionById(req, res) {
    try {
        const { id } = req.params;

        const obtainedQuestion = await questionService.getQuestionById(id);

        if (!obtainedQuestion) {
            return res.status(404).json({
                error: "Pregunta no encontrada"
            });
        }

        return res.status(200).json(obtainedQuestion);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Error al buscar pregunta"
        });
    }
}


export default {
    getAllQuestions,
    getQuestionById
};