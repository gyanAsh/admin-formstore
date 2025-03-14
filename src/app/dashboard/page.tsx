import { Card, CardFooter, CardHeader } from "@/components/ui/card";

export default async function Home() {
  const pages = [{ path: "/" }];
  return (
    // <main className="flex min-h-screen w-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex-col items-center justify-center relative isolate">
    // <main className="flex flex-col items-center justify-center">
    <div
      className="min-h-screen w-full grid p-4 grid-cols-2 gap-4 bg-gradient-to-br from-zinc-50 dark:from-zinc-950 via-zinc-200 dark:via-zinc-800
    to-zinc-50 dark:to-zinc-900 relative isolate"
    >
      <Card className="flex flex-col justify-between hover:-translate-y-1.5 active:scale-95 hover:cursor-pointer duration-200">
        <CardHeader className="text-4xl">Create Form</CardHeader>
        <CardFooter className="self-end">
          <ArrowTopRight />
        </CardFooter>
      </Card>
      <Card className="flex flex-col justify-between hover:-translate-y-1.5 active:scale-95 hover:cursor-pointer duration-200">
        <CardHeader className="text-4xl">Create Workspace</CardHeader>
        <CardFooter className="self-end">
          <ArrowTopRight />
        </CardFooter>
      </Card>
      <Card className="flex flex-col justify-between hover:-translate-y-1.5 active:scale-95 hover:cursor-pointer duration-200">
        <CardHeader className="text-4xl">View Submissions Analysis</CardHeader>
        <CardFooter className="self-end">
          <ArrowTopRight />
        </CardFooter>
      </Card>
      <Card className="flex flex-col justify-between hover:-translate-y-1.5 active:scale-95 hover:cursor-pointer duration-200">
        <CardHeader className="text-4xl">Try Templates</CardHeader>
        <CardFooter className="self-end">
          <ArrowTopRight />
        </CardFooter>
      </Card>
    </div>
    // </main>
  );
}

const ArrowTopRight = ({ ...props }) => (
  <svg
    width="40"
    height="40"
    {...props}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M30.8503 11.5866L30.8503 34.1421V34.2892H30.9973L34.1452 34.2892L34.2922 34.2892L34.2922 34.1421L34.2922 5.85786L34.2922 5.7108L34.1452 5.71081L5.86089 5.71081L5.71383 5.71081L5.71383 5.85786L5.71383 9.00571L5.71383 9.15277L5.86088 9.15277L28.4164 9.15276L4.64397 32.9252L4.53998 33.0292L4.64397 33.1332L6.86983 35.3591L6.97382 35.463L7.0778 35.3591L30.8503 11.5866Z"
      fill="white"
      stroke="white"
      strokeWidth="0.294118"
    />
  </svg>
);
