// import { workspaces } from "@/server/db/schema";
import { desc } from "drizzle-orm";
import { z } from "zod";
import { j, publicProcedure } from "../jstack";

export const workspaceRouter = j.router({
  all: publicProcedure.get(async ({ c, ctx }) => {
    const { db } = ctx;
    // const workspaceList = await db
    //   .select()
    //   .from(workspaces);

    // return c.superjson(workspaceList ?? null);
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
