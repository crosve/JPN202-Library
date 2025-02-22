package auth

import (
	"errors"
	"net/http"
	"strings"
)

func GetAdminId(header http.Header) (string, error) {
	val := header.Get("Authorization")

	if val == "" {
		return "", errors.New("authorization header not found")
	}

	vals := strings.Split(val, " ")

	if len(vals) != 2 {
		return "", errors.New("authorization header is not valid")
	}

	if vals[0] != "Bearer" {
		return "", errors.New("authorization header is not valid")
	}

	return vals[1], nil
}
