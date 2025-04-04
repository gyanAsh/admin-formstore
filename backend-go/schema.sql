-- This the refernce schema, this will be update along with the database as
-- soon as modification are made to the database. This cannot be used for
-- migartion unless the tables are being created from the scratch.

-- placeholder user until google oauth has been implemented
CREATE TABLE IF NOT EXISTS users (
	ID SERIAL PRIMARY KEY,
	username VARCHAR NOT NULL UNIQUE,
	password VARCHAR NOT NULL
);
