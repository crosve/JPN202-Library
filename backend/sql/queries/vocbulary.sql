-- name: CreateVocabulary :one
INSERT INTO vocabulary (vocabularyId, hiragana, kanji, translation, chapterNumber, type)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *; 

-- name: CreateVocabularyForList :exec
INSERT INTO vocabulary (vocabularyId, hiragana, kanji, translation, chapterNumber, type)
VALUES ($1, $2, $3, $4, $5, $6);


-- name: GetVocabulary :one
SELECT * FROM vocabulary
WHERE hiragana LIKE '%' || COALESCE($1, '') || '%'
OR kanji LIKE '%' || COALESCE($1, '') || '%'
OR translation LIKE '%' || COALESCE($1, '') || '%';
