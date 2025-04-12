import { memo } from "react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";

export default memo(function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center relative isolate">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16">
        <h1
          className={cn(
            "inline-flex tracking-tight flex-col gap-1 transition text-center",
            "font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-none lg:text-[4rem]",
            "bg-gradient-to-r from-20% bg-clip-text text-transparent",
            "from-blue-500 to-purple-500"
          )}
        >
          <span>Home</span>
        </h1>

        <p className="text-lg/7 md:text-xl/8 text-pretty sm:text-wrap sm:text-center text-center mb-8">
          The stack for building seriously fast, lightweight and{" "}
          <span className="inline sm:block">this is it's home page.</span>
        </p>
      </div>
      <div className="flex gap-2">
        <Button asChild>
          <NavLink to={"/about"}>About</NavLink>
        </Button>
        <Button asChild>
          <NavLink to={"/workspace"}>Workspace (Protected)</NavLink>
        </Button>
        <Button asChild>
          <NavLink to={"/login"}>Login</NavLink>
        </Button>
      </div>
    </main>
  );
});
