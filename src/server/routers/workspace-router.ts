import * as tables from "@/server/db/schema";
import { desc } from "drizzle-orm";
import { z } from "zod";
import { j, authenticatedProcedure } from "../jstack";

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
          .regex(/^[a-zA-Z0-9_]+$/, {
            message: "Name can only include letters, numbers, and underscores",
          }),
      })
    )
    .mutation(async ({ ctx, c, input }) => {
      const { name } = input;
      const { db } = ctx;
      console.log({ name });
      //  const workspace = await db.insert(tables.workspace).values({ name });

      const userId = 0; // this wall fail so change it later when we have a user
      // const res = await db.insert(workspaces).values({ name, ownerId: userId });

      return c.superjson({});
    }),
});
