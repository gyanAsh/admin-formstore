import { desc } from "drizzle-orm";
import { z } from "zod";
import { j, authenticatedProcedure } from "../jstack";
import { posts } from "../db/schema";

export const postRouter = j.router({
  recent: authenticatedProcedure.query(async ({ c, ctx }) => {
    const { db } = ctx;

    const [recentPost] = await db
      .select()
      .from(posts)
      .orderBy(desc(posts.createdAt))
      .limit(1);

    return c.superjson(recentPost ?? null);
  }),

  create: authenticatedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, c, input }) => {
      const { name } = input;
      const { db } = ctx;

      const post = await db.insert(posts).values({ name });

      return c.superjson(post);
    }),
});
