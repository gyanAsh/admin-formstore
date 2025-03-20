import * as tables from "@/server/db/schema";
import { desc } from "drizzle-orm";
import { z } from "zod";
import { j, authenticatedProcedure } from "../jstack";
import { eq } from "drizzle-orm";

export const formRouter = j.router({
  create: authenticatedProcedure.get(async ({c, ctx}) => {
    return c.redirect("/dashboard/form/create", 302);
  }),
});
