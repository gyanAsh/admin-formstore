import * as tables from "@/server/db/schema";
import { desc } from "drizzle-orm";
import { z } from "zod";
import { j, authenticatedProcedure } from "../jstack";
import { and, eq } from "drizzle-orm";

export const subformRouter = j.router({
  create: authenticatedProcedure
    .input(
      z.object({
        formId: z.number(),
        sequenceNumber: z.number(),
        elementType: z.enum([
          "",
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

      try {
        const subformResults = await db
          .insert(tables.form_subform)
          .values({
            formId: input.formId,
            sequenceNumber: input.sequenceNumber,
            subformType: input.elementType,
          })
          .returning({ subformId: tables.form_subform.id });
        c.status(201);
        if (subformResults.length < 1 && subformResults[0]) {
          throw new Error("subform should have length of at least 1");
        }
        return c.superjson({
          subformId: subformResults[0]!.subformId,
        });
      } catch (err) {
        console.error(err);
        const subformResults = await db
          .select()
          .from(tables.form_subform)
          .where(
            and(
              eq(tables.form_subform.formId, input.formId),
              eq(tables.form_subform.sequenceNumber, input.sequenceNumber),
            ),
          );
        c.status(409);
        if (subformResults.length < 1 && subformResults[0]) {
          throw new Error("subform should have length of at least 1");
        }
        return c.superjson({
          subformId: subformResults[0]!.id,
          elementType: subformResults[0]!.subformType,
          sequenceNumber: subformResults[0]!.sequenceNumber,
        });
      }
    }),
  list: authenticatedProcedure
    .input(
      z.object({
        formId: z.number(),
      }),
    )
    .get(async ({ c, ctx, input }) => {
      const { db, session } = ctx;
      const res = await db
        .select()
        .from(tables.form_subform)
        .innerJoin(tables.form, eq(tables.form_subform.formId, tables.form.id))
        .where(
          and(
            eq(tables.form_subform.formId, input.formId),
            eq(tables.form.userId, session.user.id),
          ),
        );

      return c.superjson(res.map((x) => x.form_subforms));
    }),

  delete: authenticatedProcedure
    .input(
      z.object({
        formId: z.number(),
        sequenceNumber: z.number(),
      }),
    )
    .post(async ({ c, ctx, input }) => {
      const { db, session } = ctx;
      await db
        .delete()
        .from(tables.form_subform)
        .where(
          and(
            eq(tables.form_subform.formId, input.formId),
            eq(tables.form_subform.sequenceNumber, input.sequenceNumber),
          ),
        );
      return c.superjson({ message: "delete successful" });
    }),
});
