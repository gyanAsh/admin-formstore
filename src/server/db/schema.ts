import {
  pgTable,
  text,
  integer,
  timestamp,
  boolean,
  serial,
  index,
  primaryKey,
} from "drizzle-orm/pg-core";

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

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const workspace = pgTable("workspace", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  ownerId: text("user_id").notNull().references(()=> user.id, { onDelete: "cascade" }),
});

export const current_workspace = pgTable("current_workspace", {
  userId: text("user_id").notNull().references(() => user.id).primaryKey(),
  workspaceId: integer("workspace_id").notNull().references(()=> workspace.id, {onDelete: 'cascade'}),
});

export const form = pgTable("form", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, {onDelete: 'cascade'}),
  workspaceId: integer("workspace_id").notNull().references(()=> workspace.id, {onDelete: 'cascade'}),
});

export const form_component = pgTable("form_component", {
  id: serial("id").primaryKey(),
  formId: integer("form_id").notNull().references(() => form.id, {onDelete: 'cascade'}),
  fieldName: text("field_name").notNull(),
  fieldValue: text("field_name").notNull(),
  fieldType: text("field_name"), // null values would assume text type
});
