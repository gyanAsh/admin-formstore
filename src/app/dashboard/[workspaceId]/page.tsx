import { FormListing } from "./form-listing";
import { TopHeader } from "./top-header";

export default async function Home() {
  const pages = [{ path: "/" }];
  return (
    // <main className="flex min-h-screen w-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex-col items-center justify-center relative isolate">
    // <main className="flex flex-col items-center justify-center">
    <div className="w-full">
      <TopHeader />
      <FormListing />
    </div>
    // </main>
  );
}
