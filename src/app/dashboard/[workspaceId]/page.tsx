import { FormListing } from "./form-listing";
import { TopHeader } from "./top-header";

export default async function Home() {
  const pages = [{ path: "/" }];
  return (
    // <main className="flex min-h-screen w-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex-col items-center justify-center relative isolate">
    // <main className="flex flex-col items-center justify-center">
    <div
      className="min-h-screen w-full flex flex-col p-4 gap-4 bg-gradient-to-br from-zinc-50 dark:from-zinc-950 via-zinc-200 dark:via-zinc-800
    to-zinc-50 dark:to-zinc-900 relative isolate"
    >
      <TopHeader />
      <FormListing />
    </div>
    // </main>
  );
}
