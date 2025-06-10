-- theory
-- ------
-- Add a column name id_uuid to user change add this to all the tables where
-- user_id was previously present. Then start and replace every foreign key
-- relationship with this key and finally drop the old keys and replace it
-- with new ones.

-- enable the extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- create new column in users
ALTER TABLE users ADD COLUMN id_uuid UUID DEFAULT uuid_generate_v4();

-- -- update empty values from users (not needed as default autofills the columns)
-- UPDATE users SET id_uuid = uuid_generate_v4();
--
-- ALTER TABlE users ALTER COLUMN id_uuid SET NOT NULL;

-- add column to workspace and update references to that
ALTER TABLE workspaces ADD COLUMN user_id_uuid UUID;

UPDATE workspaces SET user_id_uuid = users.id_uuid FROM users WHERE users.ID
	= workspaces.user_id;

-- remove old constraints
ALTER TABLE workspaces DROP CONSTRAINT workspaces_user_id_fkey;

ALTER TABLE workspaces DROP COLUMN user_id;

ALTER TABLE workspaces RENAME COLUMN user_id_uuid TO user_id;

-- drop old primary key and replace it with new one
ALTER TABLE users DROP CONSTRAINT users_pkey;

ALTER TABLE users ADD PRIMARY KEY (id_uuid);

ALTER TABLE users DROP COLUMN ID;

ALTER TABLE users RENAME COLUMN id_uuid TO ID;

-- add back old constraints
ALTER TABLE workspaces ADD CONSTRAINT workspaces_user_id_fkey FOREIGN KEY (user_id)
	REFERENCES users (ID);

