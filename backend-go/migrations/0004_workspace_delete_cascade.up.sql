ALTER TABLE forms DROP CONSTRAINT forms_workspace_id_fkey;

ALTER TABLE forms ADD CONSTRAINT forms_workspace_id_fkey
FOREIGN KEY (workspace_id) REFERENCES workspaces(ID) ON DELETE CASCADE;
