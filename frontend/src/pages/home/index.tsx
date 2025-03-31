import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import endpoint_home from "./endpoint";
import { $counter } from "@/store/count";
import { memo } from "react";

export default memo(function Home() {
  const apidata = useQuery({
    queryKey: [endpoint_home.getJsonData.key],
    queryFn: () => endpoint_home.getJsonData.func($counter),
    refetchOnWindowFocus: false,
  });

  console.log({ data: "isError", apidata });

  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16">
        <h1
          className={cn(
            "inline-flex tracking-tight flex-col gap-1 transition text-center",
            "font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-none lg:text-[4rem]",
            "bg-gradient-to-r from-20% bg-clip-text text-transparent",
            "from-blue-500 to-purple-500"
          )}
        >
          <span>JStack</span>
        </h1>

        <p className="text-lg/7 md:text-xl/8 text-pretty sm:text-wrap sm:text-center text-center mb-8">
          The stack for building seriously fast, lightweight and{" "}
          <span className="inline sm:block">
            end-to-end typesafe Next.js apps.
          </span>
        </p>
      </div>
    </>
  );
});
