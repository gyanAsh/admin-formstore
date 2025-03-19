import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { FileChartColumn, FolderPlus, Plus } from "lucide-react";

export const TopHeader = () => {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card
        className="relative h-full md:h-20 lg:h-28 py-2 md:py-4 
        active:scale-95 border-0 group cursor-pointer
        transition ease-in-out hover:translate-y-0.5 duration-150 
        shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_rgba(0,0,0,1)] 
        dark:shadow-[4px_4px_0px_rgba(250,250,250,1)] dark:hover:shadow-[0px_0px_0px_rgba(250,250,250,1)] "
      >
        <CardHeader className="text-lg lg:text-xl font-semibold px-3 md:px-4 ">
          New Form{" "}
        </CardHeader>
        <CardFooter className="self-end ">
          <div
            className="absolute size-7 md:size-9 bottom-3 right-3 md:bottom-4 md:right-4 
            bg-violet-200 dark:bg-violet-400/75 transition-all duration-75 group-hover:bg-violet-300 dark:group-hover:bg-violet-400 border
            flex items-center justify-center rounded-lg group-hover:rounded-xl border-violet-300 dark:border-violet-400 shadow-xs"
          >
            <FigmaForms strokeWidth={1.5} />
          </div>
        </CardFooter>
      </Card>
      <Card
        className="relative h-full md:h-20 lg:h-28 py-2 md:py-4 
        active:scale-95 border-0 group cursor-pointer
        transition ease-in-out hover:translate-y-0.5 duration-150 
        shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_rgba(0,0,0,1)] 
        dark:shadow-[4px_4px_0px_rgba(250,250,250,1)] dark:hover:shadow-[0px_0px_0px_rgba(250,250,250,1)] "
      >
        <CardHeader className="text-lg lg:text-xl font-semibold px-3 md:px-4 ">
          New Workspace{" "}
        </CardHeader>
        <CardFooter className="self-end">
          <div
            className="absolute size-7 md:size-9 bottom-3 right-3 md:bottom-4 md:right-4 
            bg-violet-200 dark:bg-violet-400/75 transition-all duration-75 group-hover:bg-violet-300 dark:group-hover:bg-violet-400 border
            flex items-center justify-center rounded-lg group-hover:rounded-xl border-violet-300 dark:border-violet-400 shadow-xs"
          >
            <FigmaFolder strokeWidth={1.5} />
          </div>
        </CardFooter>
      </Card>
      <Card
        className="relative h-full md:h-20 lg:h-28 py-2 md:py-4 
        active:scale-95 border-0 group cursor-pointer
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
            className="absolute size-7 md:size-9 bottom-3 right-3 md:bottom-4 md:right-4 
            bg-violet-200 dark:bg-violet-400/75 transition-all duration-75 group-hover:bg-violet-300 dark:group-hover:bg-violet-400 border
            flex items-center justify-center rounded-lg group-hover:rounded-xl border-violet-300 dark:border-violet-400 shadow-xs"
          >
            <FigmaAnalysis strokeWidth={1.5} />
          </div>
        </CardFooter>
      </Card>
      <Card
        className="relative h-full md:h-20 lg:h-28 py-2 md:py-4 
        active:scale-95 border-0 group cursor-pointer
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
            className="absolute size-7 md:size-9 bottom-3 right-3 md:bottom-4 md:right-4 
            bg-violet-200 dark:bg-violet-400/75 transition-all duration-75 group-hover:bg-violet-300 dark:group-hover:bg-violet-400 border
            flex items-center justify-center rounded-lg group-hover:rounded-xl border-violet-300 dark:border-violet-400 shadow-xs"
          >
            <FigmaCompus strokeWidth={1.5} />
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

const FigmaForms = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      {...props}
      fill="none"
    >
      <path
        stroke="#000"
        strokeWidth="1.5"
        d="M2.75 17.5v-11c0-.966.784-1.75 1.75-1.75h9.164c.38 0 .75.124 1.053.352l5.836 4.394c.439.33.697.848.697 1.398V17.5a1.75 1.75 0 0 1-1.75 1.75h-15a1.75 1.75 0 0 1-1.75-1.75Z"
      />
      <path fill="#E7F900" d="m20 10-6-5 1 4z" />
      <path
        stroke="#000"
        strokeWidth="1.5"
        d="M14 5v2.5a2.5 2.5 0 0 0 2.5 2.5H21"
      />
    </svg>
  );
};

const FigmaFolder = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      {...props}
      fill="none"
    >
      <g filter="url(#a)">
        <path
          stroke="#000"
          strokeWidth="1.5"
          d="M13.36 6.883h6.14c.966 0 1.75.784 1.75 1.75V17.5a1.75 1.75 0 0 1-1.75 1.75h-15a1.75 1.75 0 0 1-1.75-1.75v-8A.25.25 0 0 1 3 9.25h5.536a3.25 3.25 0 0 0 1.949-.65l1.825-1.367a1.75 1.75 0 0 1 1.05-.35Z"
          shapeRendering="crispEdges"
        />
      </g>
      <path
        fill="#E7F900"
        stroke="#000"
        strokeWidth="1.5"
        d="M4.5 4.75h4.667c.378 0 .747.123 1.05.35L12.75 7l-2.533 1.9a1.75 1.75 0 0 1-1.05.35H2.75V6.5c0-.966.784-1.75 1.75-1.75Z"
      />
      <defs>
        <filter
          id="a"
          width="28"
          height="21.867"
          x="-2"
          y="6.133"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_5_26" />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_5_26"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

const FigmaCompus = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      {...props}
      fill="none"
    >
      <path
        fill="#E7F900"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M13.725 12.934a1.25 1.25 0 0 1-.791.79h0l-3.988 1.33 1.33-3.988h0a1.25 1.25 0 0 1 .79-.79h0l3.988-1.33z"
      />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M21.25 12a9.25 9.25 0 1 1-18.5 0 9.25 9.25 0 0 1 18.5 0"
      />
    </svg>
  );
};

const FigmaAnalysis = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      {...props}
      fill="none"
    >
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M2.75 13.5v-7c0-.966.784-1.75 1.75-1.75h15c.966 0 1.75.784 1.75 1.75v7a1.75 1.75 0 0 1-1.75 1.75h-15a1.75 1.75 0 0 1-1.75-1.75"
      />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="m5 20 1.667-1.6M19 20l-1.667-1.6m-10.666 0 .833-.8.76-.81a2.5 2.5 0 0 1 1.823-.79h3.834a2.5 2.5 0 0 1 1.824.79l.759.81.833.8m-10.666 0h10.666"
      />
      <path
        stroke="#E7F900"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m6 13 2.695-2.76a1.824 1.824 0 0 1 2.61 0v0c.806.826 2.163.7 2.935-.157A16.2 16.2 0 0 1 18 7"
      />
    </svg>
  );
};
