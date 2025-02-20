-- name: CreateChapter :one
INSERT INTO chapter (chapterId, chapterNumber, grammarId, vocabularyId) VALUES ($1, $2, $3, $4) RETURNING *;


