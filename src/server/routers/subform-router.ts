import * as tables from "@/server/db/schema";
import { desc } from "drizzle-orm";
import { z } from "zod";
import { j, authenticatedProcedure } from "../jstack";
import { and, eq } from "drizzle-orm";

const subformTypeEnum = [
  "",
  "email",
  "phone_number",
  "address",
  "website",
  "rating",
] as const;

export const subformRouter = j.router({
  create: authenticatedProcedure
    .input(
      z.object({
        formId: z.number(),
        sequenceNumber: z.number(),
        elementType: z.enum(subformTypeEnum),
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

      let subformResults;
      try {
        subformResults = await db
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
        c.status(409);
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

      let subforms = res.map((x) => x.form_subforms);
      subforms.sort((a, b) => {
        if (a.sequenceNumber < b.sequenceNumber) {
          return -1;
        } else if (a.sequenceNumber == b.sequenceNumber) {
          throw new Error(
            "undefined state two subform should not have the same sequence number",
          );
        } else {
          return 1;
        }
      });
      console.log(subforms);
      return c.superjson(subforms);
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
        .delete(tables.form_subform)
        .where(
          and(
            eq(tables.form_subform.formId, input.formId),
            eq(tables.form_subform.sequenceNumber, input.sequenceNumber),
          ),
        );
      return c.superjson({ message: "delete successful" });
    }),

  update_type: authenticatedProcedure
    .input(
      z.object({
        subformId: z.number(),
        elementType: z.enum(subformTypeEnum),
      }),
    )
    .post(async ({ c, ctx, input }) => {
      const { db, session } = ctx;
      await db
        .update(tables.form_subform)
        .set({ subformType: input.elementType })
        .where(eq(tables.form_subform.id, input.subformId));
      return c.superjson({ message: "updated successfully" });
    }),
});
