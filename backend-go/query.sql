-- name: GetWorkspacesForUser :many
SELECT ID, name, created_at, updated_at FROM workspaces WHERE user_id = $1;


-- name: GetFormsInWorkspace :many
SELECT
	forms.ID, forms.title, forms.created_at, forms.updated_at,
	workspaces.ID, workspaces.name, workspaces.created_at,
	workspaces.updated_at
FROM
	forms
INNER JOIN
	workspaces
ON
	forms.workspace_id = workspaces.id
WHERE
	workspace_id = $1
AND
	workspaces.user_id = $2;
