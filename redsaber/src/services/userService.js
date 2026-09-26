import pool from "../config/config.js";
import bcrypt from "bcryptjs";

async function registerUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await pool.query(
        `
        INSERT INTO users (username, password_hash)
        VALUES (
            ?,
            ?
        )
        `,
        [username, hashedPassword]
    );

    return Number(result.insertId);
}

async function getAllUsers() {
    const rows = await pool.query(`
        SELECT id_user, username, created_at FROM users
    `);

    return rows;
}

async function getUserById(id_user) {
    const rows = await pool.query(
        `
        SELECT id_user, username, created_at
        FROM users
        WHERE id_user = ?
        `,
        [id_user]
    );

    return rows[0];
}

export default {
    registerUser,
    getAllUsers,
    getUserById
};