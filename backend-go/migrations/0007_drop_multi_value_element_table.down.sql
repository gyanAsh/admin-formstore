CREATE TABLE IF NOT EXISTS form_element_multi_values (
	ID SERIAL PRIMARY KEY,
	value VARCHAR,
	date_value DATE,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
	form_element_id INTEGER NOT NULL,
	FOREIGN KEY (form_element_id) REFERENCES form_elements(ID)
);
