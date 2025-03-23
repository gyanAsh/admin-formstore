import * as tables from "@/server/db/schema";
import { z } from "zod";
import { j, authenticatedProcedure } from "../jstack";

export const formRouter = j.router({
  create: authenticatedProcedure
    .input(
      z.object({
        workspace_id: z.number(),
        form_title: z
          .string()
          .min(3, { message: "Name must be between 3 to 20 characters" })
          .max(20, { message: "Name must be between 3 to 20 characters" })
          .regex(/^[a-zA-Z0-9_\ ]+$/, {
            message:
              "Name can only include letters, numbers, and underscores and space",
          }),
      })
    )
    .mutation(async ({ c, ctx, input }) => {
      const { workspace_id, form_title } = input;
      const { db, session } = ctx;

      const createdForm = await db
        .insert(tables.form)
        .values({
          title: form_title,
          userId: session.user.id,
          workspaceId: workspace_id,
        })
        .returning();
      return c.superjson(
        { message: "New form created!", formId: createdForm[0]?.id },
        201
      );
    }),
});
