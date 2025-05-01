import { memo } from "react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import SignInButton from "@/components/sign-in-button";

export default memo(function Home() {
  return (
    <main
      className="flex min-h-screen w-full flex-col items-center justify-center relative isolate
      [background-image:radial-gradient(at_34.644396551724135%_42.70833333333333%,_#7bb6dd_0px,_transparent_50%),_radial-gradient(at_33.02801724137931%_66.875%,_#7366e4_0px,_transparent_50%),_radial-gradient(at_29.148706896551722%_85.625%,_#ba90d8_0px,_transparent_50%)] bg-[#E2E2E2]
      dark:bg-[#181818] dark:[background-image:radial-gradient(at_70%_84%,_#181818_0%,_transparent_60%),_radial-gradient(at_36%_99%,_#8758ff_0%,_transparent_50%),_radial-gradient(at_35%_62%,_#5cb8e4_0%,_transparent_40%),_radial-gradient(at_28%_50%,_#f2f2f2_0%,_transparent_30%)]
      "
      style={{}}
    >
      <div className="container flex flex-col items-center justify-center gap-1 px-4 py-16">
        <h1
          className={cn(
            "inline-flex tracking-tight flex-col gap-1 transition text-center",
            "font-display text-5xl md:text-6xl font-semibold leading-none lg:text-[4.3rem]",
            "bg-clip-text text-transparent",
            // "bg-gradient-to-r from-15% from-cyan-500 to-green-500"
            // "bg-radial from-15%",
            // " from-teal-400 to-lime-500",
            " bg-gradient-to-tl from-blue-700 to-purple-700",
            "dark:from-blue-400 dark:to-purple-400"
            // "dark:from-teal-200 dark:to-lime-200"
          )}
        >
          <span>Formstore</span>
        </h1>

        <p className="text-lg/7 md:text-xl/8 text-pretty sm:text-wrap sm:text-center text-center mb-8">
          &bull; Effortless Surveys &bull; Instant Insights
          <br />
          <span className="inline sm:block text-base mt-1.5">
            Launch fully branded, mobile-ready surveys in minutes—no code
            required.
          </span>
        </p>
      </div>
      <div className="flex gap-2">
        <SignInButton
          triggerText="Get Started-it's free"
          effect={"click"}
          className="rounded-2xl"
        />
        <Button className="rounded-2xl" effect={"click"} variant={"black"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className=""
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
            />
          </svg>
          Watch a 1-minute Demo
        </Button>
        {/* <Button asChild>
          <NavLink to={"/workspace"}>Workspace (Protected)</NavLink>
        </Button>
        <Button asChild>
          <NavLink to={"/login"}>Login</NavLink>
        </Button> */}
      </div>
      <FormTemplates />
    </main>
  );
});

const FormTemplates = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 2500 }),
  ]);
  return (
    <>
      <div className="fixed bottom-0 -z-10 w-full flex items-center justify-center">
        <div className=" overflow-hidden" ref={emblaRef}>
          <div className="flex px-[calc(1rem_*_-1)] touch-pan-y touch-pinch-zoom">
            <div className="mx-2 flex-[0_0_55%] bg-sky-400/20 dark:bg-sky-800/40 rounded-t-3xl border h-[80dvh] w-[100dvw]"></div>
            <div className="mx-2 flex-[0_0_55%] bg-pink-400/20 dark:bg-pink-800/40 rounded-t-3xl border"></div>
            <div className="mx-2 flex-[0_0_55%] bg-emerald-400/20 dark:bg-emerald-800/40 rounded-t-3xl border"></div>
            <div className="mx-2 flex-[0_0_55%] bg-amber-400/20 dark:bg-amber-800/40 rounded-t-3xl border"></div>
          </div>
        </div>
      </div>
    </>
  );
};
