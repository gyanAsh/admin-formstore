ALTER TABLE "current_workspace" DROP CONSTRAINT "current_workspace_workspace_id_workspace_id_fk";
--> statement-breakpoint
ALTER TABLE "workspace" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "current_workspace" ADD CONSTRAINT "current_workspace_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;