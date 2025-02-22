// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.28.0
// source: vocbulary.sql

package database

import (
	"context"
	"database/sql"

	"github.com/google/uuid"
)

const createVocabulary = `-- name: CreateVocabulary :one
INSERT INTO vocabulary (vocabularyId, hiragana, kanji, translation)
VALUES ($1, $2, $3, $4)
RETURNING vocabularyid, hiragana, kanji, translation, chapterid
`

type CreateVocabularyParams struct {
	Vocabularyid uuid.UUID
	Hiragana     string
	Kanji        string
	Translation  string
}

func (q *Queries) CreateVocabulary(ctx context.Context, arg CreateVocabularyParams) (Vocabulary, error) {
	row := q.db.QueryRowContext(ctx, createVocabulary,
		arg.Vocabularyid,
		arg.Hiragana,
		arg.Kanji,
		arg.Translation,
	)
	var i Vocabulary
	err := row.Scan(
		&i.Vocabularyid,
		&i.Hiragana,
		&i.Kanji,
		&i.Translation,
		&i.Chapterid,
	)
	return i, err
}

const getVocabulary = `-- name: GetVocabulary :one
SELECT vocabularyid, hiragana, kanji, translation, chapterid FROM vocabulary
WHERE hiragana LIKE '%' || COALESCE($1, '') || '%'
OR kanji LIKE '%' || COALESCE($1, '') || '%'
OR translation LIKE '%' || COALESCE($1, '') || '%'
`

func (q *Queries) GetVocabulary(ctx context.Context, dollar_1 sql.NullString) (Vocabulary, error) {
	row := q.db.QueryRowContext(ctx, getVocabulary, dollar_1)
	var i Vocabulary
	err := row.Scan(
		&i.Vocabularyid,
		&i.Hiragana,
		&i.Kanji,
		&i.Translation,
		&i.Chapterid,
	)
	return i, err
}
