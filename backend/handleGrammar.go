package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/crosve/JPN202-Library/internal/database"
	"github.com/google/uuid"
)

type Pattern struct {
	Form     string   `json:"form"`
	Usage    string   `json:"usage"`
	Meanings []string `json:"meanings"`
}

type GrammarExample struct {
	Japanese    string `json:"japanese"`
	Reading     string `json:"reading"`
	Translation string `json:"translation"`
	Note        string `json:"note,omitempty"`
}

type Examples struct {
	Introduction string           `json:"introduction"`
	Patterns     []Pattern        `json:"patterns"`
	Examples     []GrammarExample `json:"examples"`
}

type CreateGrammarParams struct {
	Grammarid     uuid.UUID       `json:"grammar_id"`
	Grammartopic  string          `json:"grammar_topic"`
	Examples      json.RawMessage `json:"examples"`
	Pagerefrence  sql.NullString  `json:"page_reference"`
	Chapternumber string          `json:"chapter_number"`
}

type Parameters struct {
	GrammarTopic  string   `json:"grammar_topic"`
	Examples      Examples `json:"examples"`
	PageReference string   `json:"page_reference"`
	ChapterNumber string   `json:"chapter_number"`
}

func (apiCfg *apiConfig) handleCreateGrammar(w http.ResponseWriter, r *http.Request) {

	params := Parameters{}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&params); err != nil {
		respondWithError(w, 400, "Invalid request payload")
		return
	}

	examplesJSON, err := json.Marshal(params.Examples)
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Error marshalling examples: %v", err))
		return
	}

	grammar, err := apiCfg.DB.CreateGrammar(r.Context(), database.CreateGrammarParams{
		Grammarid:     uuid.New(),
		Grammartopic:  params.GrammarTopic,
		Examples:      examplesJSON,
		Pagerefrence:  sql.NullString{String: params.PageReference, Valid: true},
		Chapternumber: params.ChapterNumber,
	})

	if err != nil {
		respondWithError(w, 500, fmt.Sprintf("Error creating grammar: %v", err))
		return
	}

	respondWithJSON(w, 200, grammar)

}

func (apiCfg *apiConfig) handleGetGrammarByChapter(w http.ResponseWriter, r *http.Request) {
	chapterNumber := r.URL.Query().Get("chapter_number")

	grammar, err := apiCfg.DB.GetGrammarByChapter(r.Context(), chapterNumber)
	if err != nil {
		respondWithError(w, 500, fmt.Sprintf("Error getting grammar: %v", err))
		return
	}

	respondWithJSON(w, 200, grammar)
}
