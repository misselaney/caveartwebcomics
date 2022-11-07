CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE,
    avatar TEXT,
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
    name TEXT NOT NULL,
    subdomain TEXT NOT NULL UNIQUE,
    description TEXT,
    author INT references users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    unlisted BOOLEAN DEFAULT FALSE,
    private BOOLEAN DEFAULT FALSE,
    thumbnail TEXT,
    UNIQUE (author, name)
);
CREATE TABLE IF NOT EXISTS chapters (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    index INT NOT NULL,
    description TEXT NOT NULL,
    comic_id INT REFERENCES comics(id),
    thumbnail TEXT,
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
    comic_id INT REFERENCES comics(id) ON DELETE CASCADE,
    chapter_id INT REFERENCES chapters(id),
    created_at TIMESTAMP DEFAULT NOW(),
    release_on TIMESTAMP DEFAULT NOW(),
    members_only BOOLEAN DEFAULT false,
    UNIQUE (comic_id, chapter_id, page_number)
);
create table comics_readers (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    comic_id INT REFERENCES comics(id),
    created_at TIMESTAMP default NOW(),
    dropped_at TIMESTAMP DEFAULT null,
    UNIQUE (user_id, comic_id)
)
create table comics_comments (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    comic_id INT REFERENCES comics(id),
    created_at TIMESTAMP default NOW(),
    parent_id INT REFERENCES comics_comments(id),
    approved BOOLEAN DEFAULT TRUE,
    content TEXT,
    ip_address TEXT,
)