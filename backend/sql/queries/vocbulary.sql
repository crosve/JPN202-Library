-- name: CreateVocabulary :one
INSERT INTO vocabulary (vocabularyId, hiragana, kanji, translation)
VALUES ($1, $2, $3, $4)
RETURNING *; 


-- name: GetVocabulary :one
SELECT * FROM vocabulary
WHERE hiragana LIKE '%' || COALESCE($1, '') || '%'
OR kanji LIKE '%' || COALESCE($1, '') || '%'
OR translation LIKE '%' || COALESCE($1, '') || '%';
