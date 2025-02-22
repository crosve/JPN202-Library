package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/crosve/JPN202-Library/internal/database"
)

func (apiCfg *apiConfig) handleValidateAdmin(w http.ResponseWriter, r *http.Request) {
	type ValidateAdminParams struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}
	params := ValidateAdminParams{}

	decode := json.NewDecoder(r.Body)

	err := decode.Decode(&params)

	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Invalid request payload: %v", err))
		return
	}

	Admin, error := apiCfg.DB.ValidateAdmin(r.Context(), database.ValidateAdminParams{
		Username: params.Username,
		Password: params.Password,
	})

	if error != nil {
		respondWithError(w, 500, fmt.Sprintf("Error validating admin: %v", error))
		return
	}

	respondWithJSON(w, 200, Admin)

	// Check if the username and password are correct
	// If they are, return a 200 status code
	// If they are not, return a 401 status code
}
