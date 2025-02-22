-- +goose Up
ALTER TABLE chapter DROP COLUMN grammarid, DROP COLUMN vocabularyid;


-- +goose Down
ALTER TABLE chapter 
ADD COLUMN grammarid UUID NOT NULL REFERENCES grammar(grammarID), 
ADD COLUMN vocabularyid UUID NOT NULL REFERENCES vocabulary(vocabID);