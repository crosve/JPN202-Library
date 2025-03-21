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
INSERT INTO vocabulary (vocabularyId, hiragana, kanji, translation, chapterNumber, type)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING vocabularyid, hiragana, kanji, translation, type, chapternumber
`

type CreateVocabularyParams struct {
	Vocabularyid  uuid.UUID
	Hiragana      string
	Kanji         string
	Translation   string
	Chapternumber string
	Type          string
}

func (q *Queries) CreateVocabulary(ctx context.Context, arg CreateVocabularyParams) (Vocabulary, error) {
	row := q.db.QueryRowContext(ctx, createVocabulary,
		arg.Vocabularyid,
		arg.Hiragana,
		arg.Kanji,
		arg.Translation,
		arg.Chapternumber,
		arg.Type,
	)
	var i Vocabulary
	err := row.Scan(
		&i.Vocabularyid,
		&i.Hiragana,
		&i.Kanji,
		&i.Translation,
		&i.Type,
		&i.Chapternumber,
	)
	return i, err
}

const createVocabularyForList = `-- name: CreateVocabularyForList :exec
INSERT INTO vocabulary (vocabularyId, hiragana, kanji, translation, chapterNumber, type)
VALUES ($1, $2, $3, $4, $5, $6)
`

type CreateVocabularyForListParams struct {
	Vocabularyid  uuid.UUID
	Hiragana      string
	Kanji         string
	Translation   string
	Chapternumber string
	Type          string
}

func (q *Queries) CreateVocabularyForList(ctx context.Context, arg CreateVocabularyForListParams) error {
	_, err := q.db.ExecContext(ctx, createVocabularyForList,
		arg.Vocabularyid,
		arg.Hiragana,
		arg.Kanji,
		arg.Translation,
		arg.Chapternumber,
		arg.Type,
	)
	return err
}

const getVocabulary = `-- name: GetVocabulary :one
SELECT vocabularyid, hiragana, kanji, translation, type, chapternumber FROM vocabulary
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
		&i.Type,
		&i.Chapternumber,
	)
	return i, err
}

const getVocabularyByChapter = `-- name: GetVocabularyByChapter :many
SELECT hiragana, kanji, translation, type FROM vocabulary
WHERE chapterNumber = $1
`

type GetVocabularyByChapterRow struct {
	Hiragana    string
	Kanji       string
	Translation string
	Type        string
}

func (q *Queries) GetVocabularyByChapter(ctx context.Context, chapternumber string) ([]GetVocabularyByChapterRow, error) {
	rows, err := q.db.QueryContext(ctx, getVocabularyByChapter, chapternumber)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetVocabularyByChapterRow
	for rows.Next() {
		var i GetVocabularyByChapterRow
		if err := rows.Scan(
			&i.Hiragana,
			&i.Kanji,
			&i.Translation,
			&i.Type,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}
