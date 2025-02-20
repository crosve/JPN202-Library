package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/crosve/JPN202-Library/internal/database"
	"github.com/google/uuid"
)

func (apiCfg *apiConfig) handleCreateGrammar(w http.ResponseWriter, r *http.Request) {

	type Example struct {
		JpnVersion     string `json:"jpnversion"`
		EnglishVersion string `json:"englishversion"`
	}

	type paramaters struct {
		GrammarTopic string    `json:"grammar_topic"`
		Examples     []Example `json:"examples"`
		PageRefrence string    `json:"page_refrence"`
	}

	params := paramaters{}

	decode := json.NewDecoder(r.Body)
	err := decode.Decode(&params)

	if err != nil {
		respondWithError(w, 400, "Invalid request payload")
		return
	}

	examplesJSON, err := json.Marshal(params.Examples)

	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Error marshalling examples: %v", err))
		return
	}

	Grammar, err := apiCfg.DB.CreateGrammar(r.Context(), database.CreateGrammarParams{
		Grammarid:    uuid.New(),
		Grammartopic: params.GrammarTopic,
		Examples:     json.RawMessage(examplesJSON),
		Pagerefrence: sql.NullString{String: params.PageRefrence, Valid: true},
	})

	if err != nil {
		respondWithError(w, 500, fmt.Sprintf("Error creating grammar: %v", err))
		return
	}

	respondWithJSON(w, 200, Grammar)

}
