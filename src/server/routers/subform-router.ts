import * as tables from "@/server/db/schema";
import { desc } from "drizzle-orm";
import { z } from "zod";
import { j, authenticatedProcedure } from "../jstack";
import { eq } from "drizzle-orm";

export const subformRouter = j.router({
  create: authenticatedProcedure
    .input(
      z.object({
        formId: z.number(),
        sequenceNumber: z.number(),
        elementType: z.enum([
          "email",
          "phone_number",
          "address",
          "website",
          "rating",
        ]),
      }),
    )
    .mutation(async ({ c, ctx, input }) => {
      const { db, session } = ctx;
      const formData = await db
        .select()
        .from(tables.form)
        .where(eq(tables.form.id, input.formId));

      if (formData[0] && formData[0].userId != session.user.id) {
        c.status(403);
        return;
      }

      const subformResults = await db.insert(tables.form_subform).values({
        formId: input.formId,
        sequenceNumber: input.sequenceNumber,
        subformType: input.elementType,
      }).returning({subformId: tables.form_subform.id});

      return c.superjson({
        subformId: subformResults[0].subformId,
      });
    }),
});
