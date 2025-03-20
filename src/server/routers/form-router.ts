import * as tables from "@/server/db/schema";
import { desc } from "drizzle-orm";
import { z } from "zod";
import { j, authenticatedProcedure } from "../jstack";
import { eq } from "drizzle-orm";

export const formRouter = j.router({
  create: authenticatedProcedure.get(async ({ c, ctx }) => {
    const workspaceId = parseInt(c.req.query("workspace_id"));
    const { db, session } = ctx;
    if (isNaN(workspaceId)) {
      throw new Error("failed to parse workspace id");
    }
    console.log(workspaceId);
    const createdForm = await db
      .insert(tables.form)
      .values({
        userId: session.user.id,
        workspaceId: workspaceId,
      })
      .returning();
    console.log(createdForm);

    return c.redirect("/dashboard/form/create", 302);
  }),
});
