CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    session_hash TEXT DEFAULT null,
    created_at TIMESTAMP DEFAULT NOW()
);
