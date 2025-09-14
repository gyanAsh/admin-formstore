BEGIN;

ALTER TABLE submission_elements DROP CONSTRAINT submission_entries_element_id_fkey;
ALTER TABLE submission_elements ADD CONSTRAINT submission_entries_element_id_fkey 
FOREIGN KEY (element_id) REFERENCES form_elements(ID) ON DELETE CASCADE;

COMMIT;
