BEGIN;

ALTER TABLE submission_entries DROP COLUMN data;

COMMIT;
