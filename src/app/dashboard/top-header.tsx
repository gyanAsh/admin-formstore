import { Card, CardFooter, CardHeader } from "@/components/ui/card";

export const TopHeader = () => {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="relative h-20 lg:h-28 py-2 md:py-4 hover:-translate-y-1.5 active:scale-95 hover:cursor-pointer duration-200">
        <CardHeader className="text-sm md:text-base lg:text-xl px-2 md:px-4 ">
          Create Form
        </CardHeader>
        <CardFooter className="self-end">
          <ArrowTopRight
            className={
              "absolute w-3.5 h-3.5 md:w-4 lg:w-5 md:h-4 lg:h-5 bottom-2 right-2 md:bottom-4 md:right-4"
            }
          />
        </CardFooter>
      </Card>
      <Card className="relative h-20 lg:h-28 py-2 md:py-4 hover:-translate-y-1.5 active:scale-95 hover:cursor-pointer duration-200">
        <CardHeader className="text-sm md:text-base lg:text-xl px-2 md:px-4 ">
          Create Workspace
        </CardHeader>
        <CardFooter className="self-end">
          <ArrowTopRight
            className={
              "absolute w-3.5 h-3.5 md:w-4 lg:w-5 md:h-4 lg:h-5 bottom-2 right-2 md:bottom-4 md:right-4"
            }
          />
        </CardFooter>
      </Card>
      <Card className="relative h-20 lg:h-28 py-2 md:py-4 hover:-translate-y-1.5 active:scale-95 hover:cursor-pointer duration-200">
        <CardHeader className="text-sm md:text-base lg:text-xl px-2 md:px-4 ">
          View Submissions Analysis
        </CardHeader>
        <CardFooter className="self-end">
          <ArrowTopRight
            className={
              "absolute w-3.5 h-3.5 md:w-4 lg:w-5 md:h-4 lg:h-5 bottom-2 right-2 md:bottom-4 md:right-4"
            }
          />
        </CardFooter>
      </Card>
      <Card className="relative h-20 lg:h-28 py-2 md:py-4 hover:-translate-y-1.5 active:scale-95 hover:cursor-pointer duration-200">
        <CardHeader className="text-sm md:text-base lg:text-xl px-2 md:px-4 ">
          Try Templates
        </CardHeader>
        <CardFooter className="self-end">
          <ArrowTopRight
            className={
              "absolute w-3.5 h-3.5 md:w-4 lg:w-5 md:h-4 lg:h-5 bottom-2 right-2 md:bottom-4 md:right-4"
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
