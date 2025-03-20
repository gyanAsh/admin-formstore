"use client";
import { FigmaAdd, FigmaBars } from "@/components/icons";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export const TopHeader = () => {
  const router = useRouter();
  function createForm() {
    try {
      const workspace_id = parseInt(window.location.href.split("/")[4]);
      router.push(`/api/form/create?workspace_id=${workspace_id}`);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <section className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      <Card
        className="relative h-full md:h-20 py-2 md:py-4 
        active:scale-95 border-0 group cursor-pointer
        transition ease-in-out hover:translate-y-0.5 duration-150 
        shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_rgba(0,0,0,1)] 
        dark:shadow-[4px_4px_0px_rgba(250,250,250,1)] dark:hover:shadow-[0px_0px_0px_rgba(250,250,250,1)] "
        onClick={() => createForm()}
      >
        <CardHeader className="text-lg lg:text-xl font-semibold px-3 md:px-4">
          New Form{" "}
        </CardHeader>
        <CardFooter className="self-end ">
          <div
            className="absolute size-7 md:size-9 bottom-3 right-3 md:bottom-4 md:right-4 
            bg-violet-400 dark:bg-violet-400/75 transition-all duration-75 group-hover:bg-violet-500/90 dark:group-hover:bg-violet-400 border
            flex items-center justify-center rounded-lg group-hover:rounded-xl border-violet-300 dark:border-violet-400 shadow-xs"
          >
            <FigmaAdd className="text-black" />
          </div>
        </CardFooter>
      </Card>

      <Card
        className="relative h-full md:h-20 py-2 md:py-4 
        active:scale-95 border-0 group cursor-pointer
        transition ease-in-out hover:translate-y-0.5 duration-150 
        shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_rgba(0,0,0,1)] 
        dark:shadow-[4px_4px_0px_rgba(250,250,250,1)] dark:hover:shadow-[0px_0px_0px_rgba(250,250,250,1)] "
      >
        {" "}
        <CardHeader className="text-lg lg:text-xl font-semibold px-3 md:px-4 ">
          View Analysis{" "}
        </CardHeader>
        <CardFooter className="self-end">
          <div
            className="absolute size-7 md:size-9 bottom-3 right-3 md:bottom-4 md:right-4 
            bg-violet-400 dark:bg-violet-400/75 transition-all duration-75 group-hover:bg-violet-500/90 dark:group-hover:bg-violet-400 border
            flex items-center justify-center rounded-lg group-hover:rounded-xl border-violet-300 dark:border-violet-400 shadow-xs"
          >
            <FigmaBars className="text-black" />
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};
