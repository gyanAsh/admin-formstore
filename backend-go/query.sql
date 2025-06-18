-- name: GetWorkspacesForUser :many
SELECT ID, name, created_at, updated_at FROM workspaces WHERE user_id = $1;


-- name: GetFormsInWorkspace :many
SELECT * FROM forms WHERE workspace_id = $1 ORDER BY forms.updated_at DESC, forms.created_at ASC;


-- name: GetFormDataAndElements :many
SELECT
	-- form
	forms.ID,
	forms.title,
	forms.created_at,
	forms.updated_at,
	forms.status,
	forms.design,
	-- workspace
	workspaces.ID,
	workspaces.name,
	workspaces.created_at,
	workspaces.updated_at,
	-- user
	workspaces.user_id,
	-- form elements (null values, due to left outer join)
	form_elements.seq_number,
	form_elements.type,
	form_elements.label,
	form_elements.description,
	form_elements.properties
FROM
	forms
INNER JOIN
	workspaces
ON
	forms.workspace_id = workspaces.ID
LEFT OUTER JOIN
	form_elements
ON
	form_elements.form_id = forms.ID
WHERE
	forms.ID = $1
AND
	workspaces.user_id = $2
ORDER BY
	form_elements.form_id, form_elements.seq_number;


-- name: GetWorkspaceByID :one
SELECT * FROM workspaces WHERE ID = $1 AND workspaces.user_id = $2;
