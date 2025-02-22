-- +goose Up
CREATE TABLE vocabulary (
    vocabularyId UUID PRIMARY KEY,
    hiragana TEXT NOT NULL,
    kanji TEXT NOT NULL , 
    translation TEXT NOT NULL,
    type TEXT NOT NULL, 
    chapterNumber TEXT NOT NULL REFERENCES chapter(chapterNumber)
);



-- +goose Down
DROP TABLE vocabulary;