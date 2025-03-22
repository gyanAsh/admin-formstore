import * as tables from "@/server/db/schema";
import { z } from "zod";
import { j, authenticatedProcedure } from "../jstack";

export const formRouter = j.router({
  create: authenticatedProcedure
    .input(
      z.object({
        workspace_id: z.number(),
      })
    )
    .mutation(async ({ c, ctx, input }) => {
      const { workspace_id } = input;
      const { db, session } = ctx;

      const createdForm = await db
        .insert(tables.form)
        .values({
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
