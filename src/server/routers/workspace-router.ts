import * as tables from "@/server/db/schema";
import { desc } from "drizzle-orm";
import { z } from "zod";
import { j, publicProcedure, authenticatedProcedure } from "../jstack";

export const workspaceRouter = j.router({
  all: authenticatedProcedure.get(async ({ c, ctx }) => {
    const { db } = ctx;
    const workspaceList = await db
      .select()
      .from(tables.workspace);

    return c.superjson(workspaceList ?? null);
  }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, c, input }) => {
      const { name } = input;
      const { db } = ctx;

      const userId = 0; // this wall fail so change it later when we have a user
      // const res = await db.insert(workspaces).values({ name, ownerId: userId });

      // return c.superjson(post);
    }),
});
