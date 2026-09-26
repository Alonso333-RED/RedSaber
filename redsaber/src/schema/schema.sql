CREATE DATABASE IF NOT EXISTS redsaber
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE redsaber;

CREATE TABLE users (
    id_user INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE questions (
    id_question INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,

    author_id INT UNSIGNED NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_questions_author
        FOREIGN KEY (author_id)
        REFERENCES users(id_user)
        ON DELETE CASCADE
);

CREATE TABLE answers (
    id_answer INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    question_id INT UNSIGNED NOT NULL,
    author_id INT UNSIGNED NOT NULL,

    content TEXT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_answers_question
        FOREIGN KEY (question_id)
        REFERENCES questions(id_question)
        ON DELETE CASCADE,

    CONSTRAINT fk_answers_author
        FOREIGN KEY (author_id)
        REFERENCES users(id_user)
        ON DELETE CASCADE
);