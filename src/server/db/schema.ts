import { index, pgEnum } from "drizzle-orm/pg-core";

import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
  json,
  uuid,
  primaryKey,
  varchar,
  unique,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Define the role enum
export const roleEnum = pgEnum("role", ["admin", "maintainer", "viewer"]);

// Define the form element type enum
export const formElementTypeEnum = pgEnum("form_element_type", [
  "short_text",
  "contact_info",
  "email",
  "phone_number",
  "address",
  "website",
  "multiple_choice",
  "dropdown",
  "picture_choice",
  "yes_no",
  "legal",
  "net_promoter_score",
  "opinion_scale",
  "rating",
  "ranking",
  "matrix",
]);

export const posts = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (table) => [index("Post_name_idx").on(table.name)]
);
// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  password: text("password").notNull(), // Store hashed password
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Workspaces table
export const workspaces = pgTable("workspaces", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  ownerId: integer("owner_id")
    .references(() => users.id)
    .notNull(),
  isPremium: boolean("is_premium").default(false).notNull(),
});

// User Workspaces table
export const userWorkspaces = pgTable(
  "user_workspaces",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .references(() => users.id)
      .notNull(),
    workspaceId: integer("workspace_id")
      .references(() => workspaces.id)
      .notNull(),
    role: roleEnum("role").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [unique().on(table.userId, table.workspaceId)]
);

// Forms table
export const forms = pgTable("forms", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  workspaceId: integer("workspace_id")
    .references(() => workspaces.id)
    .notNull(),
  createdById: integer("created_by_id")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isPublished: boolean("is_published").default(false).notNull(),
  submissionCount: integer("submission_count").default(0).notNull(),
});

// Form Elements table
export const formElements = pgTable("form_elements", {
  id: serial("id").primaryKey(),
  formId: integer("form_id")
    .references(() => forms.id)
    .notNull(),
  type: formElementTypeEnum("type").notNull(),
  label: text("label").notNull(),
  required: boolean("required").default(false).notNull(),
  order: integer("order").notNull(),
  configuration: json("configuration"), // Store element-specific configuration
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Form submissions table
export const formSubmissions = pgTable("form_submissions", {
  id: serial("id").primaryKey(),
  formId: integer("form_id")
    .references(() => forms.id)
    .notNull(),
  submittedBy: integer("submitted_by").references(() => users.id),
  submitterEmail: text("submitter_email"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  data: json("data").notNull(),
});

// Subscription plans table
export const subscriptionPlans = pgTable("subscription_plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(), // In cents
  formLimit: integer("form_limit").notNull(),
  workspaceLimit: integer("workspace_limit").notNull(),
  features: json("features"), // Additional features as JSON
});

// User subscriptions table
export const userSubscriptions = pgTable("user_subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  planId: integer("plan_id")
    .references(() => subscriptionPlans.id)
    .notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  isActive: boolean("is_active").default(true).notNull(),
  paymentMethod: text("payment_method"),
  paymentReference: text("payment_reference"),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  workspaces: many(userWorkspaces),
  createdForms: many(forms, { relationName: "createdBy" }),
  submissions: many(formSubmissions, { relationName: "submittedBy" }),
  subscriptions: many(userSubscriptions),
}));

export const workspacesRelations = relations(workspaces, ({ one, many }) => ({
  owner: one(users, {
    fields: [workspaces.ownerId],
    references: [users.id],
  }),
  members: many(userWorkspaces),
  forms: many(forms),
}));

export const formsRelations = relations(forms, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [forms.workspaceId],
    references: [workspaces.id],
  }),
  createdBy: one(users, {
    fields: [forms.createdById],
    references: [users.id],
    relationName: "createdBy",
  }),
  elements: many(formElements),
  submissions: many(formSubmissions),
}));
