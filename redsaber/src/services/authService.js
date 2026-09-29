import pool from "../config/config.js";
import bcrypt from "bcryptjs";

async function login(username, password) {

    const rows = await pool.query(
        "SELECT id_user, username, password_hash FROM users WHERE username = ?",
        [username]
    );

    if (rows.length === 0) {
        return null;
    }

    const user = rows[0];

    const correct = await bcrypt.compare(password, user.password_hash);

    if (!correct) {
        return null;
    }

    return { id_user: user.id_user, username: user.username };
}

export default {
    login
};