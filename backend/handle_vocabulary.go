package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"database/sql"

	"github.com/crosve/JPN202-Library/internal/database"
	"github.com/google/uuid"
)

func (apiCfg *apiConfig) handleCreateVocabulary(w http.ResponseWriter, r *http.Request) {

	type CreateVocabularyParams struct {
		Hiragana    string `json:"hiragana"`
		Kanji       string `json:"kanji"`
		Translation string `json:"translation"`
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

func (apiCfg *apiConfig) handleGetVocabulary(w http.ResponseWriter, r *http.Request) {

	queryParam := r.URL.Query().Get("query") // Get query from request

	// Convert to sql.NullString
	var query sql.NullString
	if queryParam == "" {
		query = sql.NullString{Valid: false} // Represents NULL in SQL
	} else {
		query = sql.NullString{String: queryParam, Valid: true}
	}

	vocabulary, err := apiCfg.DB.GetVocabulary(r.Context(), query)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, fmt.Sprintf("Error getting vocabulary: %v", err))
		return
	}

	respondWithJSON(w, http.StatusOK, convertVocabularyDBToVocabulary(vocabulary))
}
