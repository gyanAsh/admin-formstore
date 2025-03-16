import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { FileChartColumn, FolderPlus, Plus } from "lucide-react";

export const TopHeader = () => {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card
        className="relative h-full md:h-20 lg:h-28 py-2 md:py-4 
        active:scale-95 hover:cursor-pointer 
        border-0  bg-cyan-300/85 dark:bg-cyan-400/90
      text-black  hover:bg-custom-lemon transition ease-in-out hover:translate-y-0.5 duration-150 
        shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_rgba(0,0,0,1)] 
        dark:shadow-[4px_4px_0px_rgba(250,250,250,1)] dark:hover:shadow-[0px_0px_0px_rgba(250,250,250,1)] "
      >
        <CardHeader className="text-lg lg:text-xl font-semibold px-3 md:px-4 ">
          New Form{" "}
        </CardHeader>
        <CardFooter className="self-end">
          <Plus
            className={
              "absolute size-6 md:size-7 bottom-3 right-3 md:bottom-4 md:right-4"
            }
          />
        </CardFooter>
      </Card>
      <Card
        className="relative h-full md:h-20 lg:h-28 py-2 md:py-4 
        active:scale-95 hover:cursor-pointer 
        border-0  bg-cyan-300/85 dark:bg-cyan-400/90
      text-black  hover:bg-custom-lemon transition ease-in-out hover:translate-y-0.5 duration-150 
        shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_rgba(0,0,0,1)] 
        dark:shadow-[4px_4px_0px_rgba(250,250,250,1)] dark:hover:shadow-[0px_0px_0px_rgba(250,250,250,1)] "
      >
        <CardHeader className="text-lg lg:text-xl font-semibold px-3 md:px-4 ">
          New Workspace{" "}
        </CardHeader>
        <CardFooter className="self-end">
          <FolderPlus
            className={
              "absolute size-6 md:size-7 bottom-3 right-3 md:bottom-4 md:right-4"
            }
          />
        </CardFooter>
      </Card>
      <Card
        className="relative h-full md:h-20 lg:h-28 py-2 md:py-4 
        active:scale-95 hover:cursor-pointer 
        border-0  bg-cyan-300/85 dark:bg-cyan-400/90
      text-black  hover:bg-custom-lemon transition ease-in-out hover:translate-y-0.5 duration-150 
        shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_rgba(0,0,0,1)] 
        dark:shadow-[4px_4px_0px_rgba(250,250,250,1)] dark:hover:shadow-[0px_0px_0px_rgba(250,250,250,1)] "
      >
        {" "}
        <CardHeader className="text-lg lg:text-xl font-semibold px-3 md:px-4 ">
          Submission Insights{" "}
        </CardHeader>
        <CardFooter className="self-end">
          <FileChartColumn
            className={
              "absolute size-6 md:size-7 bottom-3 right-3 md:bottom-4 md:right-4"
            }
          />
        </CardFooter>
      </Card>
      <Card
        className="relative h-full md:h-20 lg:h-28 py-2 md:py-4 
        active:scale-95 hover:cursor-pointer 
        border-0  bg-cyan-300/85 dark:bg-cyan-400/90
      text-black  hover:bg-custom-lemon transition ease-in-out hover:translate-y-0.5 duration-150 
        shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_rgba(0,0,0,1)] 
        dark:shadow-[4px_4px_0px_rgba(250,250,250,1)] dark:hover:shadow-[0px_0px_0px_rgba(250,250,250,1)] "
      >
        {" "}
        <CardHeader className="text-lg lg:text-xl font-semibold px-3 md:px-4 ">
          Explore Templates{" "}
        </CardHeader>
        <CardFooter className="self-end">
          <ArrowTopRight
            className={
              "absolute size-6 md:size-7 bottom-3 right-3 md:bottom-4 md:right-4"
            }
          />
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
