CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    session_hash TEXT DEFAULT null,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS genres (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    parent_id INT REFERENCES genres(id)
);
CREATE TABLE IF NOT EXISTS styles (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    parent_id INT references styles(id)
);
CREATE TABLE IF NOT EXISTS comics (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    subdomain TEXT NOT NULL UNIQUE,
    description TEXT,
    author INT references users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (author, name)
);
CREATE TABLE IF NOT EXISTS chapters (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    index INT NOT NULL,
    description TEXT NOT NULL,
    comic_id INT REFERENCES comics(id),
    UNIQUE (comic_id, index)
);
CREATE TABLE IF NOT EXISTS comics_to_genres (
    id SERIAL PRIMARY KEY,
    comic_id INT REFERENCES comics(id) ON DELETE CASCADE,
    genre_id INT REFERENCES genres(id),
    UNIQUE (comic_id, genre_id)
);
CREATE TABLE IF NOT EXISTS comics_to_styles (
    id SERIAL PRIMARY KEY,
    comic_id INT REFERENCES comics(id) ON DELETE CASCADE,
    style_id INT REFERENCES styles(id),
    UNIQUE (comic_id, style_id)
);
CREATE TABLE IF NOT EXISTS comicpages (
    id SERIAL PRIMARY KEY,
    page_number INT,
    img TEXT NOT NULL UNIQUE,
    comic_id INT REFERENCES comics(id),
    chapter_id INT REFERENCES chapters(id),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (comic_id, chapter_id, page_number)
);