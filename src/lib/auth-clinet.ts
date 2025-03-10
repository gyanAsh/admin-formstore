import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_HOST!,
});

export type Session = typeof authClient.$Infer.Session;
