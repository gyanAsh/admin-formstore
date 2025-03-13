CREATE TABLE "current_workspace" (
	"user_id" text PRIMARY KEY NOT NULL,
	"workspace_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "current_workspace" ADD CONSTRAINT "current_workspace_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "current_workspace" ADD CONSTRAINT "current_workspace_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;