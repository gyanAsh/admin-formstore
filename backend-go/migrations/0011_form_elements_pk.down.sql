ALTER TABLE form_elements DROP CONSTRAINT form_elements_pkey;

ALTER TABLE form_elements ADD COLUMN ID SERIAL PRIMARY KEY;
