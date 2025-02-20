package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/crosve/JPN202-Library/internal/database"
	"github.com/google/uuid"
)

func (apiCfg *apiConfig) handleCreateVocabulary(w http.ResponseWriter, r *http.Request) {

	type CreateVocabularyParams struct {
		Hiragana    string         `json:"hiragana"`
		Kanji       sql.NullString `json:"kanji"`
		Translation string         `json:"translation"`
	}

	params := CreateVocabularyParams{}

	decode := json.NewDecoder(r.Body)

	err := decode.Decode(&params)

	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Invalid request payload: %v", err))
		return
	}

	Vocabulary, error := apiCfg.DB.CreateVocabulary(r.Context(), database.CreateVocabularyParams{
		Vocabularyid: uuid.New(),
		Hiragana:     params.Hiragana,
		Kanji:        params.Kanji,
		Translation:  params.Translation,
	})

	if error != nil {
		respondWithError(w, 500, fmt.Sprintf("Error creating vocabulary: %v", error))
		return
	}

	respondWithJSON(w, 200, convertVocabularyDBToVocabulary(Vocabulary))

}
