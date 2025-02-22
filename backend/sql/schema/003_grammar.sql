-- +goose Up
CREATE TABLE grammar (
    grammarId UUID PRIMARY KEY, 
    grammarTopic TEXT NOT NULL, 
    examples JSONB NOT NULL,
    pageRefrence TEXT,
    chapterNumber TEXT NOT NULL REFERENCES chapter(chapterNumber)
);

-- +goose Down
DROP TABLE grammar;