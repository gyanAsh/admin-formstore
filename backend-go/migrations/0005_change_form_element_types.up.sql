ALTER TABLE form_elements ALTER COLUMN element_type TYPE VARCHAR;

DROP TYPE form_element_types;

CREATE TYPE form_element_types AS ENUM (
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

ALTER TABLE form_elements ALTER COLUMN element_type TYPE form_element_types
USING element_type::form_element_types;
