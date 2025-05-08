CREATE TABLE IF NOT EXISTS users (
	ID SERIAL PRIMARY KEY,
	username VARCHAR NOT NULL,
	email VARCHAR NOT NULL UNIQUE,
	password VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS workspaces (
	ID SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
	user_id INTEGER NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(ID)
);

CREATE TABLE IF NOT EXISTS forms (
	ID SERIAL PRIMARY KEY,
	title VARCHAR NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
	workspace_id INTEGER NOT NULL,
	FOREIGN KEY (workspace_id) REFERENCES workspaces(ID)
);

CREATE TYPE form_element_types AS ENUM ('email', 'phone', 'text', 'date', 'drop_down', 'multiple_selection');

CREATE TABLE IF NOT EXISTS form_elements (
	ID SERIAL PRIMARY KEY,
	element_type form_element_types NOT NULL,
	value VARCHAR,
	date_value DATE,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
	form_id INTEGER NOT NULL,
	FOREIGN KEY (form_id) REFERENCES forms(ID)
);

CREATE TABLE IF NOT EXISTS form_element_multi_values (
	ID SERIAL PRIMARY KEY,
	value VARCHAR,
	date_value DATE,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
	form_element_id INTEGER NOT NULL,
	FOREIGN KEY (form_element_id) REFERENCES form_elements(ID)
);
