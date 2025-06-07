ALTER TABLE form_elements ALTER COLUMN element_type TYPE VARCHAR;

DROP TYPE form_element_types;

CREATE TYPE form_element_types AS ENUM ('email', 'phone', 'text', 'date', 'drop_down', 'multiple_selection');

ALTER TABLE form_elements ALTER COLUMN element_type TYPE form_element_types
USING element_type::form_element_types;
