import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { FileChartColumn, FolderPlus, Plus } from "lucide-react";

export const TopHeader = () => {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card
        className="relative h-full md:h-20 lg:h-28 py-2 md:py-4 
        active:scale-95
        border-0 group hover:cursor-[url('https://fireship.io/img/logo.svg'),auto]
        transition ease-in-out hover:translate-y-0.5 duration-150 
        shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_rgba(0,0,0,1)] 
        dark:shadow-[4px_4px_0px_rgba(250,250,250,1)] dark:hover:shadow-[0px_0px_0px_rgba(250,250,250,1)] "
      >
        <CardHeader className="text-lg lg:text-xl font-semibold px-3 md:px-4 ">
          New Form{" "}
        </CardHeader>
        <CardFooter className="self-end ">
          <div
            className="absolute size-7 md:size-9 bottom-3 right-3 md:bottom-4 md:right-4 group-hover:rounded-full
            bg-accent transition-all duration-75 group-hover:bg-violet-300 dark:group-hover:bg-violet-400 border
            flex items-center justify-center rounded-md
            border-violet-300 dark:border-violet-400 shadow-xs"
          >
            <Plus strokeWidth={1.5} />
          </div>
        </CardFooter>
      </Card>
      <Card
        className="relative h-full md:h-20 lg:h-28 py-2 md:py-4 
        active:scale-95
        border-0 group hover:cursor-[url('https://fireship.io/img/logo.svg'),auto]
        transition ease-in-out hover:translate-y-0.5 duration-150 
        shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_rgba(0,0,0,1)] 
        dark:shadow-[4px_4px_0px_rgba(250,250,250,1)] dark:hover:shadow-[0px_0px_0px_rgba(250,250,250,1)] "
      >
        <CardHeader className="text-lg lg:text-xl font-semibold px-3 md:px-4 ">
          New Workspace{" "}
        </CardHeader>
        <CardFooter className="self-end">
          <div
            className="absolute size-7 md:size-9 bottom-3 right-3 md:bottom-4 md:right-4 group-hover:rounded-full
            bg-accent transition-all duration-75 group-hover:bg-violet-300 dark:group-hover:bg-violet-400 border
            flex items-center justify-center rounded-md
            border-violet-300 dark:border-violet-400 shadow-xs"
          >
            <FolderPlus strokeWidth={1.5} />
          </div>
        </CardFooter>
      </Card>
      <Card
        className="relative h-full md:h-20 lg:h-28 py-2 md:py-4 
        active:scale-95
        border-0 group hover:cursor-[url('https://fireship.io/img/logo.svg'),auto]
        transition ease-in-out hover:translate-y-0.5 duration-150 
        shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_rgba(0,0,0,1)] 
        dark:shadow-[4px_4px_0px_rgba(250,250,250,1)] dark:hover:shadow-[0px_0px_0px_rgba(250,250,250,1)] "
      >
        {" "}
        <CardHeader className="text-lg lg:text-xl font-semibold px-3 md:px-4 ">
          Submission Insights{" "}
        </CardHeader>
        <CardFooter className="self-end">
          <div
            className="absolute size-7 md:size-9 bottom-3 right-3 md:bottom-4 md:right-4 group-hover:rounded-full
            bg-accent transition-all duration-75 group-hover:bg-violet-300 dark:group-hover:bg-violet-400 border
            flex items-center justify-center rounded-md
            border-violet-300 dark:border-violet-400 shadow-xs"
          >
            <FileChartColumn strokeWidth={1.5} />
          </div>
        </CardFooter>
      </Card>
      <Card
        className="relative h-full md:h-20 lg:h-28 py-2 md:py-4 
        active:scale-95
        border-0 group hover:cursor-[url('https://fireship.io/img/logo.svg'),auto]
        transition ease-in-out hover:translate-y-0.5 duration-150 
        shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_rgba(0,0,0,1)] 
        dark:shadow-[4px_4px_0px_rgba(250,250,250,1)] dark:hover:shadow-[0px_0px_0px_rgba(250,250,250,1)] "
      >
        {" "}
        <CardHeader className="text-lg lg:text-xl font-semibold px-3 md:px-4 ">
          Explore Templates{" "}
        </CardHeader>
        <CardFooter className="self-end">
          <div
            className="absolute size-7 md:size-9 bottom-3 right-3 md:bottom-4 md:right-4 group-hover:rounded-full
            bg-accent transition-all duration-75 group-hover:bg-violet-300 dark:group-hover:bg-violet-400 border
            flex items-center justify-center rounded-md
            border-violet-300 dark:border-violet-400 shadow-xs"
          >
            <ArrowTopRight strokeWidth={1.5} />
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};

const ArrowTopRight = ({ ...props }) => (
  <svg
    width="20"
    height="20"
    {...props}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M30.8503 11.5866L30.8503 34.1421V34.2892H30.9973L34.1452 34.2892L34.2922 34.2892L34.2922 34.1421L34.2922 5.85786L34.2922 5.7108L34.1452 5.71081L5.86089 5.71081L5.71383 5.71081L5.71383 5.85786L5.71383 9.00571L5.71383 9.15277L5.86088 9.15277L28.4164 9.15276L4.64397 32.9252L4.53998 33.0292L4.64397 33.1332L6.86983 35.3591L6.97382 35.463L7.0778 35.3591L30.8503 11.5866Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.294118"
    />
  </svg>
);
