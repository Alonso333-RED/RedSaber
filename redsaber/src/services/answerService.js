import pool from "../config/config.js";

async function getAllAnswers() {
    const rows = await pool.query(`
        SELECT
            id_answer,
            question_id,
            author_id,
            content,
            updated_at
            updated_at
        FROM answers
    `);

    return rows;
}

async function getAnswerById(id_answer) {
    const rows = await pool.query(
        `
        SELECT
            id_answer,
            question_id,
            author_id,
            content,
            updated_at
            updated_at
        FROM answers
        WHERE id_answer = ?
        `,
        [id_answer]
    );

    return rows[0];
}

async function createAnswer(question_id, author_id, content) {
    const result = await pool.query(
        `INSERT INTO answers (question_id, author_id, content) VALUES (?, ?, ?)`,
        [question_id, author_id, content]
    );

    return Number(result.insertId);
}

export default {
    getAllAnswers,
    getAnswerById,
    createAnswer
};