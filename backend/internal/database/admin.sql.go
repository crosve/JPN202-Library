// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.28.0
// source: admin.sql

package database

import (
	"context"
)

const validateAdmin = `-- name: ValidateAdmin :one
SELECT adminid, username, password, createdat, updatedat FROM admin WHERE username = $1 AND password = $2 LIMIT 1
`

type ValidateAdminParams struct {
	Username string
	Password string
}

func (q *Queries) ValidateAdmin(ctx context.Context, arg ValidateAdminParams) (Admin, error) {
	row := q.db.QueryRowContext(ctx, validateAdmin, arg.Username, arg.Password)
	var i Admin
	err := row.Scan(
		&i.Adminid,
		&i.Username,
		&i.Password,
		&i.Createdat,
		&i.Updatedat,
	)
	return i, err
}
