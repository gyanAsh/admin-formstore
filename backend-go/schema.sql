-- This the refernce schema, this will be update along with the database as
-- soon as modification are made to the database. This cannot be used for
-- migartion unless the tables are being created from the scratch.

-- placeholder user until google oauth has been implemented
CREATE TABLE IF NOT EXISTS users (
	ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	username VARCHAR NOT NULL,
	email VARCHAR NOT NULL UNIQUE,
	password VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS workspaces (
	ID SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	deleted_at TIMESTAMP WITH TIME ZONE,
	user_id UUID NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(ID)
);

CREATE TYPE form_status_type AS ENUM (
	'draft', -- unpublished
	'published',
	'completed'
);

CREATE TABLE IF NOT EXISTS forms (
	ID SERIAL PRIMARY KEY,
	title VARCHAR NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	workspace_id INTEGER NOT NULL,
	public_id UUID,
	status form_status_type NOT NULL DEFAULT 'draft',
	design JSON,
	FOREIGN KEY (workspace_id) REFERENCES workspaces(ID) ON DELETE CASCADE
);

CREATE TYPE form_element_types AS ENUM (
	'welcome',
	'exit',
	'website',
	'number',
	'address',
	'consent',
	'multiselect',
	'singleselect',
	'dropdown',
	'ranking',
	'rating',
	'date',
	'text',
	'longtext',
	'phone',
	'email',
	'boolean'
);

CREATE TABLE IF NOT EXISTS form_elements (
	type form_element_types NOT NULL,
	seq_number INTEGER NOT NULL,
	label VARCHAR,
	required BOOLEAN DEFAULT FALSE NOT NULL,
	description VARCHAR,
	created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	form_id INTEGER NOT NULL,
	properties JSON,
	FOREIGN KEY (form_id) REFERENCES forms(ID) ON DELETE CASCADE,
	PRIMARY KEY (form_id, seq_number)
);
