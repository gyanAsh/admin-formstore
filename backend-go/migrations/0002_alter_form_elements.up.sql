ALTER TABLE form_elements DROP COLUMN value;
ALTER TABLE form_elements ADD COLUMN label VARCHAR;
ALTER TABLE form_elements ADD COLUMN description VARCHAR;
