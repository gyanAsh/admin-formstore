BEGIN;

ALTER TABLE forms ADD COLUMN public_id UUID;

UPDATE forms SET public_id = uuid_generate_v4() WHERE status = 'published';

COMMIT;
