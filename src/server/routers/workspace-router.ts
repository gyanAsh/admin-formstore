import * as tables from "@/server/db/schema";
import { desc } from "drizzle-orm";
import { z } from "zod";
import { j, authenticatedProcedure } from "../jstack";
import { eq } from "drizzle-orm";

export const workspaceRouter = j.router({
  all: authenticatedProcedure.get(async ({ c, ctx }) => {
    const { db } = ctx;
    const workspaceList = await db.select().from(tables.workspace);

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
      }),
    )
    .mutation(async ({ ctx, c, input }) => {
      const { name } = input;
      const { db } = ctx;
      const workspace = await db.insert(tables.workspace).values({ name });

      return c.superjson({});
    }),

  current: authenticatedProcedure.get(async ({ c, ctx }) => {
    const { db, session } = ctx;
    console.log(session.user.id);
    const currentWorkspace = await db
      .select()
      .from(tables.current_workspace)
      .innerJoin(
        tables.workspace,
        eq(tables.workspace.id, tables.current_workspace.workspaceId),
      )
      .where(eq(tables.current_workspace.userId, session.user.id));
    return c.superjson({ currentWorkspace });
  }),
});
