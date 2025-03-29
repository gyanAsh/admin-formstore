import * as tables from "@/server/db/schema";
import { z } from "zod";
import { j, authenticatedProcedure } from "../jstack";
import { and, eq } from "drizzle-orm";

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
      }),
    )
    .mutation(async ({ c, ctx, input }) => {
      const { workspace_id, form_title } = input;
      const { db, session } = ctx;

      const createdForms = await db
        .insert(tables.form)
        .values({
          title: form_title,
          userId: session.user.id,
          workspaceId: workspace_id,
        })
        .returning();

      if (createdForms.length < 1) {
        throw new Error("failed to create form");
      }
      const createdForm = createdForms[0];
      if (!createdForm) {
        throw new Error("failed to create form");
      }
      const createSubform = await db
        .insert(tables.form_subform)
        .values({
          formId: createdForm.id,
          sequenceNumber: 1,
        })
      return c.superjson(
        { message: "New form created!", formId: createdForm.id },
        201,
      );
    }),

  list: authenticatedProcedure
    .input(
      z.object({
        workspace_id: z.number(),
      }),
    )
    .get(async ({ c, ctx, input }) => {
      const { db, session } = ctx;
      const res = await db
        .select()
        .from(tables.form)
        .leftJoin(tables.workspace, eq(tables.form.workspaceId, tables.workspace.id))
        .where(
          and(
            eq(tables.form.userId, session.user.id),
            eq(tables.form.workspaceId, input.workspace_id),
          ),
        );

      if (res.length < 1) {
        throw new Error("failed to fetch data");
      }
      const workspace = res.map(x => x.workspace)[0]!;
      const formList = res.map(x => x.form);

      return c.superjson({ forms: formList, workspace: workspace });
    }),
});
