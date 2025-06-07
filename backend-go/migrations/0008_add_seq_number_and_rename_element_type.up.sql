ALTER TABLE form_elements RENAME COLUMN element_type TO type;

DELETE FROM form_elements;

ALTER TABLE form_elements ADD COLUMN seq_number INTEGER NOT NULL;
