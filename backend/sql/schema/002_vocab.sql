-- +goose Up
CREATE TABLE vocabulary (
    vocabularyId UUID PRIMARY KEY,
    hiragana TEXT NOT NULL,
    kanji TEXT, 
    translation TEXT NOT NULL
);

-- +goose Down
DROP TABLE vocabulary;