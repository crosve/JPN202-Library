-- name: CreateVocabulary :one
INSERT INTO vocabulary (vocabularyId, hiragana, kanji, translation)
VALUES ($1, $2, $3, $4)
RETURNING *; 