import answerService from "../services/answerService.js";

async function getAllAnswers(req, res) {
    try {
        const allAnswers = await answerService.getAllAnswers();

        console.log("Todas las Respuestas:", allAnswers);

        return res.status(200).json({
            message: "Todas las respuestas",
            allAnswers
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Error al encontrar todas las respuestas"
        });
    }
}

async function getAnswerById(req, res) {
    try {
        const { id } = req.params;

        const obtainedAnswer = await answerService.getAnswerById(id);

        if (!obtainedAnswer) {
            return res.status(404).json({
                error: "Respuesta no encontrada"
            });
        }

        return res.status(200).json(obtainedAnswer);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Error al buscar pregunta"
        });
    }
}


export default {
    getAllAnswers,
    getAnswerById
};