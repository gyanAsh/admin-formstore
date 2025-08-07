BEGIN;

ALTER TABLE form_elements ALTER COLUMN type TYPE VARCHAR;

DROP TYPE form_element_types;

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
	'boolean',
	'nps' -- net promoter score
);

ALTER TABLE form_elements ALTER COLUMN type TYPE form_element_types
USING type::form_element_types;

COMMIT;
