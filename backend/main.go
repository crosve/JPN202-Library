package main

import (
	"database/sql"
	"os"

	"fmt"
	"log"
	"net/http"

	"github.com/crosve/JPN202-Library/internal/database"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

type apiConfig struct {
	DB *database.Queries
}

func isRunningInDocker() bool {
	_, err := os.Stat("/.dockerenv")
	fmt.Println("isRunningInDocker: ", !os.IsNotExist(err))
	return !os.IsNotExist(err)
}

func main() {
	godotenv.Load()

	portString := os.Getenv("PORT")

	if portString == "" {
		log.Fatal("Port is not set in .env file")
		return
	}

	databaseURL := os.Getenv("SQL_DATABASE_URL")

	if isRunningInDocker() {
		databaseURL = os.Getenv("DOCKER_SQL_DATABASE_URL")
	}

	if databaseURL == "" {
		log.Fatal("Database URL is not set in .env file")
		return
	}

	conn, err := sql.Open("postgres", databaseURL)
	if err != nil {
		log.Fatal(fmt.Printf("Error opening database connection: %v", err))
		return
	}

	apiCfg := &apiConfig{
		DB: database.New(conn),
	}

	fmt.Println("Port: ", portString)

	router := chi.NewRouter()

	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	v1Router := chi.NewRouter()
	v1Router.HandleFunc("/ready", readinessHandler)
	v1Router.HandleFunc("/createGrammar", apiCfg.handleCreateGrammar)
	v1Router.HandleFunc("/getGrammar", apiCfg.handleGetGrammarByChapter)

	v1Router.HandleFunc("/createVocabulary", apiCfg.handleCreateVocabulary)
	v1Router.HandleFunc("/getVocabulary", apiCfg.handleGetVocabulary)
	v1Router.HandleFunc("/getVocabularyByChapter", apiCfg.handleGetVocabularyByChapter)

	v1Router.HandleFunc("/validateAdmin", apiCfg.handleValidateAdmin)
	v1Router.HandleFunc("/createManyVocabulary", apiCfg.authMiddleware(apiCfg.handleInsertManyVocabulary))

	router.Mount("/v1", v1Router)

	srv := &http.Server{
		Handler: router,
		Addr:    ":" + portString,
	}
	fmt.Println("Server is up and running on port: ", portString)

	err2 := srv.ListenAndServe()

	if err2 != nil {
		log.Fatal(err)
	}

}
