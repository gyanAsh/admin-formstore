BEGIN;

ALTER TABLE form_elements DROP CONSTRAINT form_elements_pkey;

ALTER TABLE form_elements ADD COLUMN ID SERIAL PRIMARY KEY;

ALTER TABLE form_elements ADD CONSTRAINT unique_form_id_seq_number
	UNIQUE(form_id, seq_number);

CREATE TABLE IF NOT EXISTS form_submissions (
	ID SERIAL PRIMARY KEY,
	form_id INTEGER NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	user_id INTEGER, -- user id can be null
	FOREIGN KEY (form_id) REFERENCES forms(ID)
);

CREATE TABLE IF NOT EXISTS submission_entries (
	ID SERIAL PRIMARY KEY,
	form_submission_id INTEGER NOT NULL,
	element_id INTEGER NOT NULL,
	FOREIGN KEY (form_submission_id) REFERENCES form_submissions(ID),
	FOREIGN KEY (element_id) REFERENCES form_elements(ID)
);

COMMIT;
