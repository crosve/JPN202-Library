package main

import (
	"github.com/crosve/JPN202-Library/internal/database"
	"github.com/google/uuid"
)

type Vocabulary struct {
	Vocabularyid  uuid.UUID `json:"vocabulary_id"`
	Hiragana      string    `json:"hiragana"`
	Kanji         string    `json:"kanji"`
	Translation   string    `json:"translation"`
	Type          string    `json:"type"`
	ChapterNumber string    `json:"chapter_number"`
}

func convertVocabularyDBToVocabulary(v database.Vocabulary) Vocabulary {

	return Vocabulary{
		Vocabularyid:  v.Vocabularyid,
		Hiragana:      v.Hiragana,
		Kanji:         v.Kanji,
		Translation:   v.Translation,
		Type:          v.Type,
		ChapterNumber: v.Chapternumber,
	}

}
