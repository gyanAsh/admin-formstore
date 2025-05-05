-- name: getWorkspacesForUser :many
SELECT ID, name, created_at, updated_at FROM workspaces WHERE user_id = $1;
