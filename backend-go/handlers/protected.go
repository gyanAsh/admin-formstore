package handlers

import (
	"encoding/json"
	"net/http"

	"backend-formstore/middleware" // Update with your module name
	"backend-formstore/utils"      // Update with your module name
)

// ProtectedHandler is an example handler that requires authentication
func ProtectedHandler(w http.ResponseWriter, r *http.Request) {
	// Retrieve claims from context (set by middleware)
	claims, ok := r.Context().Value(middleware.UserClaimsKey).(*utils.Claims)
	if !ok {
		// This should not happen if middleware is working correctly
		http.Error(w, "Could not retrieve user claims", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message":    "This is a protected route",
		"user_id":    claims.UserID,
		"username":   claims.Username,
		"expires_at": claims.ExpiresAt,
	})
}
