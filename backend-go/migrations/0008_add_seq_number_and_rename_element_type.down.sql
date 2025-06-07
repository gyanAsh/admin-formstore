ALTER TABLE form_elements DROP COLUMN seq_number;

ALTER TABLE form_elements RENAME COLUMN type to element_type;
