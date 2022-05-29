CREATE TABLE IF NOT EXISTS players 
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    nickname VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS games
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
);

CREATE TABLE IF NOT EXISTS matches
(
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(id) NOT NULL,
    date TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS player_matches
(
    id SERIAL PRIMARY KEY,
    match_id INTEGER REFERENCES matches(id) NOT NULL,
    player_id INTEGER REFERENCES players(id) NOT NULL,
    has_won BOOLEAN NOT NULL,
    score NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS rounds
(
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players(id) NOT NULL,
    match_id INTEGER REFERENCES matches(id) NOT NULL,
    round_number INTEGER NOT NULL,
    score NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS game_results_structure
(
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(id) NOT NULL,
    row_number INTEGER,
    row_name VARCHAR(255)
);