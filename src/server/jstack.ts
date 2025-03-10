import { jstack } from "jstack";
import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "hono/adapter";
import { HTTPException } from "hono/http-exception";
import { getAuth } from "@/lib/getAuth";

export interface Env {
  Bindings: {
    DATABASE_URL: string;

    CLIENT_HOST: string;
    BETTER_AUTH_URL: string;
    BETTER_AUTH_SECRET: string;

    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;

    NEXT_PUBLIC_API_HOST: string;
  };
}

export const j = jstack.init<Env>();

const databaseMiddleware = j.middleware(async ({ c, next }) => {
  const { DATABASE_URL } = env(c);

  const db = drizzle(DATABASE_URL);

  return await next({ db });
});

const authenticationMiddleware = j.middleware(async ({ c, ctx, next }) => {
  const auth = getAuth(c);
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) {
    throw new HTTPException(401, {
      message: "Unauthenticated, sign in to continue.",
    });
  }
  return await next({ session });
});

/* ----------------------------------------------------------------------------- */
/*                               Procedures                                      */
/* ----------------------------------------------------------------------------- */
export const publicProcedure = j.procedure.use(databaseMiddleware);
export const authenticatedProcedure = publicProcedure.use(
  authenticationMiddleware
);
// authorization middleware (ownership, organizations)
// paywall middleware (premium users)
// sudo middleware (admin users)
// rate limit middleware
// error handling middleware
// logging middleware
// etc ..
