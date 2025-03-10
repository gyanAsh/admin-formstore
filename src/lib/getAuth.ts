import { betterAuthOptions } from "@/server/db/auth-options";
import { user, account, session, verification } from "@/server/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "hono/adapter"; // This adapter reads Cloudflare Workers bindings from the request context

// getAuth: creates an auth instance using env vars from the current request context
export function getAuth(c: any) {
  const {
    DATABASE_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    BETTER_AUTH_SECRET,
    BETTER_AUTH_URL,
    CLIENT_HOST,
  } = env(c);

  const db = drizzle(DATABASE_URL);

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: { user, account, session, verification },
    }),
    ...betterAuthOptions(
      CLIENT_HOST!,
      BETTER_AUTH_URL!,
      BETTER_AUTH_SECRET!,
      GOOGLE_CLIENT_ID!,
      GOOGLE_CLIENT_SECRET!
    ),
  });
}
