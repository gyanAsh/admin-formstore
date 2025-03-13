"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function MyComponent() {
  const { data: session, isPending: loading } = authClient.useSession();
  const router = useRouter();
  if (loading) return <div>Loading…</div>;
  if (!session) return <div>You are not logged in.</div>;

  return (
    <div className="flex flex-col gap-1">
      Welcome, {session.user?.name}! Your email is {session.user?.email}
      <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>
    </div>
  );
}
