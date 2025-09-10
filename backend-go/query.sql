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
	form_elements.properties,
	form_elements.required
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

-- the published form cannot contain no element thus inner join
-- name: GetFormDataPublic :many
SELECT
	forms.ID,
	forms.title,
	forms.created_at,
	forms.updated_at,
	forms.status,
	forms.design,
	el.type,
	el.seq_number,
	el.label,
	el.description,
	el.created_at,
	el.updated_at,
	el.properties,
	el.required
FROM
	forms
INNER JOIN
	form_elements AS el
ON
	forms.ID = el.form_id
WHERE
	public_id = $1
AND
	forms.status = 'published';

-- name: AddFormElementsBatched :batchexec
INSERT INTO form_elements (
	type, label, seq_number, description, form_id, properties, required
) VALUES (
	$2, $3, $4, $5, $1, $6, $7
);

-- name: DeleteFormElements :exec
DELETE FROM form_elements WHERE form_id = $1;

-- name: CheckFormAccess :one
SELECT forms.ID
FROM forms
INNER JOIN workspaces
ON forms.workspace_id = workspaces.ID
WHERE forms.ID = $1 AND workspaces.user_id = $2;

-- name: UpdateFormDesign :exec
UPDATE forms SET design = $1 WHERE ID = $2;

-- name: GetAnalyticsFormSubmissions :many
SELECT submission_elements.ID, data FROM submission_elements
INNER JOIN form_submissions ON form_submission_id = form_submissions.ID
INNER JOIN forms ON form_submissions.form_id = forms.ID
INNER JOIN workspaces ON forms.workspace_id = workspaces.ID
INNER JOIN users ON workspaces.user_id = users.ID
WHERE forms.ID = $1
AND users.ID = $2;

-- name: GetPublicIDForm :one
SELECT public_id FROM forms WHERE ID = $1 AND status = 'published';
