-- name: CreateChapter :one
INSERT INTO chapter (chapterId, chapterNumber) VALUES ($1, $2) RETURNING *;


