-- +goose Up
ALTER TABLE vocabulary ADD COLUMN chapterId UUID NOT NULL REFERENCES chapter(chapterId);


-- +goose Down
ALTER TABLE vocabulary DROP COLUMN chapterId;