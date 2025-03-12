import { getAuthNext } from "@/lib/getAuth";
import { headers } from "next/headers";

export default async function TestServerPage() {
  const auth = getAuthNext();
  const session = await auth.api.getSession({headers: await headers()});
  console.log("user is", session?.user);

  return (
    <div>
      check server
    </div>
  );
}
