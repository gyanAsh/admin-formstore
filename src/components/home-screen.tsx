"use client";
import { LoaderCircle } from "lucide-react";
import NavPage from "./nav-page";
import SignIn from "./sign-in-btn";
import { authClient } from "@/lib/auth-client";

export const HomeScreen = () => {
  const { data: login_data, isPending: checking_auth } =
    authClient.useSession();

  return (
    <div className="flex gap-2">
      {checking_auth ? (
        <LoaderCircle className="size-5 animate-spin " />
      ) : login_data?.session?.id ? (
        <NavPage />
      ) : (
        <SignIn />
      )}
    </div>
  );
};
