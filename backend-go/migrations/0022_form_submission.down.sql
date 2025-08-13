BEGIN;

ALTER TABLE form_elements DROP CONSTRAINT form_elements_pkey CASCADE;
ALTER TABLE form_elements DROP CONSTRAINT unique_form_id_seq_number;
ALTER TABLE form_elements DROP COLUMN ID;

ALTER TABLE form_elements ADD CONSTRAINT form_elements_pkey PRIMARY KEY (form_id, seq_number);

DROP TABLE submission_entries;
DROP TABLE form_submissions;

COMMIT;
