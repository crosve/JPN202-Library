-- name: CreateGrammar :one
INSERT INTO grammar (grammarId, grammarTopic, examples, pageRefrence) VALUES ($1, $2, $3, $4) RETURNING *;


-- -- name: GetGrammar :one
-- SELECT * FROM grammar WHERE grammarId = $1;