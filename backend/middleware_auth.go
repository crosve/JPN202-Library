package main

import (
	"net/http"

	"github.com/crosve/JPN202-Library/internal/auth"
)

type authedHandler func(http.ResponseWriter, *http.Request)

func (apiConfig *apiConfig) authMiddleware(handler authedHandler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		_, err := auth.GetAdminId(r.Header)

		if err != nil {
			respondWithError(w, 401, "Error getting API Key: "+err.Error())
			return
		}

		handler(w, r)

	}
}
