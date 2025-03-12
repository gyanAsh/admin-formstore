"use client"
import {
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../theme-toggle";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";

export function Footer() {
  const router = useRouter();

  return (
    <>
      <Button
        effect={"click"}
        onClick={async () => {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/"); // redirect to login page
              },
            },
          });
        }}
      >
        <LogOut /> Sign Out
      </Button>
      <ModeToggle effect={"click"} className="w-full" />
    </>
  );
}
