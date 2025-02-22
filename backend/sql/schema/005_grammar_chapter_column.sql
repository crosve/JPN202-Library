-- +goose Up
ALTER TABLE grammar ADD COLUMN chapterId UUID NOT NULL DEFAULT
(
    SELECT chapterId
    FROM chapter
    WHERE chapterName = '16'

) 
REFERENCES chapter(chapterId);

-- +goose Down
ALTER TABLE grammar DROP COLUMN chapterId;