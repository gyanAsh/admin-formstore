ALTER TABLE users ADD COLUMN id_serial SERIAL;

ALTER TABLE workspaces ADD COLUMN user_id_serial INTEGER;

UPDATE workspaces SET user_id_serial = users.id_serial FROM users WHERE users.ID
	= workspaces.user_id;

ALTER TABLE workspaces DROP CONSTRAINT workspaces_user_id_fkey;

ALTER TABLE workspaces DROP COLUMN user_id;

ALTER TABLE workspaces RENAME COLUMN user_id_serial TO user_id;

ALTER TABLE users DROP CONSTRAINT users_pkey;

ALTER TABLE users ADD PRIMARY KEY (id_serial);

ALTER TABLE users DROP COLUMN ID;

ALTER TABLE users RENAME COLUMN id_serial TO ID;

ALTER TABLE workspaces ADD CONSTRAINT workspaces_user_id_fkey FOREIGN KEY (user_id)
	REFERENCES users (ID);

DROP EXTENSION IF EXISTS "uuid-ossp";
