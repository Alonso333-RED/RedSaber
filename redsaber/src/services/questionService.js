import pool from "../config/config.js";

async function getAllQuestions() {
    const rows = await pool.query(`
        SELECT
            id_question,
            title,
            content,
            author_id,
            created_at,
            updated_at
            updated_at
        FROM questions
    `);

    return rows;
}

async function getQuestionById(id_question) {
    const rows = await pool.query(
        `
        SELECT
            id_question,
            title,
            content,
            author_id,
            created_at,
            updated_at
            updated_at
        FROM questions
        WHERE id_question = ?
        `,
        [id_question]
    );

    return rows[0];
}

export default {
    getAllQuestions,
    getQuestionById
};