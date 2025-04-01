package middleware

import (
	"context"
	"net/http"
	"strings"

	"backend-formstore/utils" // Update with your module name
)

// ContextKey is a custom type for context keys to avoid collisions
type ContextKey string

const UserClaimsKey ContextKey = "userClaims"

// JwtAuthentication middleware verifies the JWT token
func JwtAuthentication(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Authorization header required", http.StatusUnauthorized)
			return
		}

		// Expecting "Bearer <token>"
		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
			http.Error(w, "Authorization header format must be Bearer {token}", http.StatusUnauthorized)
			return
		}

		tokenStr := parts[1]
		claims, err := utils.ValidateJWT(tokenStr)
		if err != nil {
			http.Error(w, "Invalid or expired token: "+err.Error(), http.StatusUnauthorized)
			return
		}

		// Add claims to the request context
		ctx := context.WithValue(r.Context(), UserClaimsKey, claims)

		// Token is valid, proceed to the next handler
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
