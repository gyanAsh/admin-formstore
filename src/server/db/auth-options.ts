import { Env } from "@/server/jstack";
import { BetterAuthOptions } from "better-auth";

export const betterAuthOptions = (
  clientHost: Env["Bindings"]["CLIENT_HOST"],
  betterAuthUrl: Env["Bindings"]["BETTER_AUTH_URL"],
  betterAuthSecret: Env["Bindings"]["BETTER_AUTH_SECRET"],
  googleClientId: Env["Bindings"]["GOOGLE_CLIENT_ID"],
  googleClientSecret: Env["Bindings"]["GOOGLE_CLIENT_SECRET"]
) => {
  return {
    advanced: {
      defaultCookieAttributes: {
        sameSite: "none",
        secure: true,
      },
    },
    socialProviders: {
      google: {
        clientId: googleClientId,
        clientSecret: googleClientSecret,
      },
    },
    trustedOrigins: [clientHost],
    baseURL: betterAuthUrl,
    secret: betterAuthSecret,
  } satisfies BetterAuthOptions;
};
