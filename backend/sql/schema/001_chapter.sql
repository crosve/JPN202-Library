-- +goose Up
CREATE TABLE chapter (
    chapterId UUID PRIMARY KEY, 
    chapterNumber TEXT NOT NULL UNIQUE
);

-- +goose Down
DROP TABLE chapter;