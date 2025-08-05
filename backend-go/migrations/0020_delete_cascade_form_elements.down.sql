BEGIN;

ALTER TABLE form_elements DROP CONSTRAINT form_elements_form_id_fkey;

ALTER TABLE form_elements ADD CONSTRAINT form_elements_form_id_fkey FOREIGN KEY (form_id) REFERENCES forms(ID);

COMMIT;
