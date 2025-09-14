BEGIN;

ALTER TABLE form_submissions DROP CONSTRAINT form_submissions_form_id_fkey;
ALTER TABLE form_submissions ADD CONSTRAINT form_submissions_form_id_fkey
FOREIGN KEY (form_id) REFERENCES forms(ID) ON DELETE CASCADE;

ALTER TABLE submission_elements DROP CONSTRAINT submission_entries_form_submission_id_fkey;
ALTER TABLE submission_elements ADD CONSTRAINT submission_entries_form_submission_id_fkey
FOREIGN KEY (form_submission_id) REFERENCES form_submissions(ID) ON DELETE CASCADE;

COMMIT;
