-- +goose Up
CREATE TABLE chapter (
    chapterId UUID PRIMARY KEY, 
    chapterNumber INT NOT NULL, 
    grammarId UUID REFERENCES grammar(grammarId),
    vocabularyId UUID REFERENCES vocabulary(vocabularyId)
); 


-- +goose Down
DROP TABLE chapter;