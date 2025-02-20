package main

import (
	"database/sql"

	"github.com/crosve/JPN202-Library/internal/database"
	"github.com/google/uuid"
)

type Vocabulary struct {
	Vocabularyid uuid.UUID      `json:"vocabulary_id"`
	Hiragana     string         `json:"hiragana"`
	Kanji        sql.NullString `json:"kanji"`
	Translation  string         `json:"translation"`
}

func convertVocabularyDBToVocabulary(v database.Vocabulary) Vocabulary {

	return Vocabulary{
		Vocabularyid: v.Vocabularyid,
		Hiragana:     v.Hiragana,
		Kanji:        v.Kanji,
		Translation:  v.Translation,
	}

}
