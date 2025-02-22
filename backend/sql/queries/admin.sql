-- name: ValidateAdmin :one
SELECT * FROM admin WHERE username = $1 AND password = $2 LIMIT 1;