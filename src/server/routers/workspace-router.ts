import * as tables from "@/server/db/schema";
import { desc } from "drizzle-orm";
import { z } from "zod";
import { j, authenticatedProcedure } from "../jstack";
import { eq } from "drizzle-orm";

export const workspaceRouter = j.router({
  all: authenticatedProcedure.get(async ({ c, ctx }) => {
    const { db } = ctx;
    const workspaceList = await db
      .select()
      .from(tables.workspace)
      .orderBy(desc(tables.workspace.updatedAt));

    return c.superjson(workspaceList ?? null);
  }),

  create: authenticatedProcedure
    .input(
      z.object({
        name: z
          .string()
          .min(3, { message: "Name must be between 3 to 20 characters" })
          .max(20, { message: "Name must be between 3 to 20 characters" })
          .regex(/^[a-zA-Z0-9_\ ]+$/, {
            message:
              "Name can only include letters, numbers, and underscores and space",
          }),
      })
    )
    .mutation(async ({ ctx, c, input }) => {
      const { name } = input;
      const { db, session } = ctx;
      await db.transaction(async (tx) => {
        const workspace = await tx
          .insert(tables.workspace)
          .values({ name, ownerId: session.user.id })
          .returning({ id: tables.workspace.id });
        // Validate the insertion result
        const workspaceId = workspace[0]?.id;
        if (!workspaceId) {
          throw new Error(
            "Failed to create workspace: ID is null or undefined."
          );
        }
        await tx
          .insert(tables.current_workspace)
          .values({ userId: session.user.id, workspaceId: workspaceId })
          .onConflictDoUpdate({
            target: tables.current_workspace.userId,
            set: { workspaceId: workspaceId },
          });
      });

      return c.superjson({});
    }),
});
