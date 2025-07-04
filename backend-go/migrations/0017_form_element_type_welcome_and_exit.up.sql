ALTER TABLE form_elements ALTER COLUMN type TYPE VARCHAR;

DROP TYPE form_element_types;

CREATE TYPE form_element_types AS ENUM (
	'welcome',
	'exit',
	'website',
	'consent',
	'multiselect',
	'dropdown',
	'ranking',
	'rating',
	'date',
	'text',
	'phone',
	'email'
);

ALTER TABLE form_elements ALTER COLUMN type TYPE form_element_types
USING type::form_element_types;
