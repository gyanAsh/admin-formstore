ALTER TABLE form_elements DROP COLUMN ID;

ALTER TABLE form_elements ADD PRIMARY KEY (form_id, seq_number);
