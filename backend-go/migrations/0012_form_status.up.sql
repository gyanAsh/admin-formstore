CREATE TYPE form_status_type AS ENUM (
	'draft',
	'published',
	'completed'
);

ALTER TABLE forms ADD COLUMN status form_status_type NOT NULL DEFAULT 'draft';
