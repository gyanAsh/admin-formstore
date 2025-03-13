"use client";
import { Loader2Icon } from "lucide-react";
import NavPage from "./nav-page";
import SignIn from "./sign-in-btn";
import { authClient } from "@/lib/auth-client";

export const HomeScreen = () => {
  const { data: login_data, isPending: checking_auth } =
    authClient.useSession();

  return (
    <div className="flex gap-2">
      {checking_auth ? (
        <Loader2Icon />
      ) : login_data?.session?.id ? (
        <NavPage />
      ) : (
        <SignIn />
      )}
    </div>
  );
};
