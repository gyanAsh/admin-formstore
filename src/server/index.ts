import { j } from "./jstack";
import { postRouter } from "./routers/post-router";
import { getAuth } from "@/lib/getAuth";
import { workspaceRouter } from "./routers/workspace-router";

/**
 * This is your base API.
 * Here, you can handle errors, not-found responses, cors and more.
 *
 * @see https://jstack.app/docs/backend/app-router
 */
const api = j
  .router()
  .basePath("/api")
  .use(j.defaults.cors)
  .on(["GET", "POST"], "/auth/**", (c) => {
    const auth = getAuth(c);
    return auth.handler(c.req.raw);
  })
  .onError(j.defaults.errorHandler);

/**
 * This is the main router for your server.
 * All routers in /server/routers should be added here manually.
 */
const appRouter = j.mergeRouters(api, {
  post: postRouter,
  workspace: workspaceRouter,
});

export type AppRouter = typeof appRouter;

export default appRouter;
