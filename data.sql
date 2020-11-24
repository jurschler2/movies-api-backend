\c movies_api

DROP TABLE IF EXISTS movies CASCADE;

CREATE TABLE movies (
    imdbID text PRIMARY KEY,
    title text NOT NULL,
    year INTEGER NOT NULL,
    director text NOT NULL,
    plot text,
    poster text,
    upvote INTEGER DEFAULT 0,
    downvote INTEGER DEFAULT 0
);
