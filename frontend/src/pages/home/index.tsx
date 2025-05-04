import React, { memo, useState } from "react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import SignInButton from "@/components/sign-in-button";
import {
  FormBGCard,
  FormCard,
} from "@/components/dashboard-templates/go-bold/page";
import { Droplet } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default memo(function Home() {
  return (
    <main
      className="flex min-h-screen w-full flex-col items-center justify-center relative isolate
      [background-image:radial-gradient(at_58%_82%,_#92c7cf_0px,_transparent_50%),radial-gradient(at_2%_78%,_#aad7d9_0px,_transparent_50%),radial-gradient(at_13%_39%,_#fbf9f1_0px,_transparent_50%),radial-gradient(at_79%_29%,_#e5e1da_0px,_transparent_50%)] bg-[#92c7cf]
      dark:bg-[#181818] dark:[background-image:radial-gradient(at_70%_84%,_#181818_0%,_transparent_60%),_radial-gradient(at_36%_99%,_#8758ff_0%,_transparent_50%),_radial-gradient(at_35%_62%,_#5cb8e4_0%,_transparent_40%),_radial-gradient(at_28%_50%,_#f2f2f2_0%,_transparent_30%)]
      "
    >
      <section className="flex flex-col items-center justify-center grow sm:h-[55dvh] w-full relative">
        <div className="container flex flex-col items-center justify-center gap-1 px-4 my-6">
          <h1
            className={cn(
              "inline-flex tracking-tight flex-col gap-1 transition text-center",
              "font-display text-6xl md:text-7xl font-semibold leading-none lg:text-8xl",
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

          <p className="text-xl/7 md:text-2xl/8 text-pretty sm:text-wrap sm:text-center text-center">
            &bull; Effortless Surveys &bull; Instant Insights
            <br />
            <span className="inline sm:block text-base md:text-xl mt-1.5">
              Launch fully branded, web & mobile-ready surveys in minutes—no
              code required.
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
      </section>

      <FormTemplates />
    </main>
  );
});

const FormTemplates = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    // Autoplay({ delay: 2500 }),
  ]);
  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className=" overflow-hidden pt-8" ref={emblaRef}>
          <div className="flex px-[calc(1rem_*_-1)] touch-pan-y touch-pinch-zoom">
            <div className="mx-2 flex-[0_0_80%] p-6 bg-sky-400/20 dark:bg-sky-800/40 rounded-t-3xl border">
              {`make these demo forms interation ( give user the feel of how easy it will be to create form with our website)`}
            </div>
            <section className="mx-2 flex-[0_0_80%] xl:flex-[0_0_1014px] max-lg:aspect-16/10 md:h-[80dvh]">
              <GoBoldForm />
            </section>

            <div className="mx-2 flex-[0_0_80%] p-6 bg-pink-400/20 dark:bg-pink-800/40 rounded-t-3xl"></div>
            <div className="mx-2 flex-[0_0_80%] p-6 bg-emerald-400/20 dark:bg-emerald-800/40 rounded-t-3xl"></div>
            <div className="mx-2 flex-[0_0_80%] p-6 bg-amber-400/20 dark:bg-amber-800/40 rounded-t-3xl"></div>
          </div>
        </div>
      </div>
    </>
  );
};

const GoBoldForm = () => {
  enum themeEnum {
    "green_grass",
    "black_plum",
    "blue_sky",
  }
  enum feedback {
    "definitely",
    "probably",
    "not_sure",
    "probably_not",
    "definitely_not",
  }
  const [theme, setTheme] = useState<themeEnum>(themeEnum.blue_sky);
  const [selectedOption, setSelectedOption] = useState<feedback>();
  return (
    <FormBGCard
      className="duration-300  p-3 md:p-6 "
      theme={
        theme === themeEnum.black_plum
          ? "black_plum"
          : theme === themeEnum.blue_sky
          ? "blue_sky"
          : "default"
      }
    >
      <FormCard
        theme={
          theme === themeEnum.black_plum
            ? "black_plum"
            : theme === themeEnum.blue_sky
            ? "blue_sky"
            : "default"
        }
        className={cn(
          " relative p-3 md:p-6",
          {
            "text-green-950 cursor-[url('/cursor/go-bold/green.svg'),_pointer]":
              theme === themeEnum.green_grass,
          },
          {
            "text-purple-950/80 cursor-[url('/cursor/go-bold/purple.svg'),_pointer]":
              theme === themeEnum.black_plum,
          },
          {
            "text-zinc-950 cursor-[url('/cursor/go-bold/sky.svg'),_pointer]":
              theme === themeEnum.blue_sky,
          }
        )}
      >
        <section className="max-md:scale-70 text-base rounded-2xl animate-bounce duration-1000 absolute -top-8 md:-top-11 -left-10 -rotate-5 bg-inherit p-1 px-2 border">
          Toggle Color
        </section>
        <section className="max-md:scale-55 absolute flex items-center gap-1 top-0 -left-8.5 md:left-0 -translate-y-1/3">
          {[
            themeEnum.blue_sky,
            themeEnum.black_plum,
            themeEnum.green_grass,
          ].map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "flex items-center justify-center rounded-2xl size-12 p-2",
                "hover:-translate-y-1 transition-all duration-300",
                "active:scale-90",
                { "bg-green-950": _ == themeEnum.green_grass },
                {
                  "bg-purple-300": _ == themeEnum.black_plum,
                },
                {
                  "bg-zinc-950": _ == themeEnum.blue_sky,
                }
              )}
              onClick={() => {
                setTheme(_);
              }}
            >
              <div
                className={cn(
                  "flex items-center justify-center rounded-[calc(14px_-_4px)] size-full p-2",
                  { "bg-green-200": _ == themeEnum.green_grass },
                  {
                    "bg-purple-400/75": _ == themeEnum.black_plum,
                  },
                  {
                    "bg-sky-200": _ == themeEnum.blue_sky,
                  }
                )}
              >
                <Droplet
                  fill="currentColor"
                  className={cn(
                    "",
                    { "text-green-950 ": _ == themeEnum.green_grass },
                    {
                      "text-purple-950": _ == themeEnum.black_plum,
                    },
                    {
                      "text-sky-950": _ == themeEnum.blue_sky,
                    }
                  )}
                />
              </div>
            </div>
          ))}
        </section>

        <main
          className={cn(
            "overflow-y-auto h-full",
            "grid grid-cols-1 xl:grid-cols-2",
            " lg:gap-2 xl:gap-4  lg:p-10 xl:p-0"
          )}
        >
          <section className="max-lg:pb-3 p-4 flex items-center">
            <h2 className=" text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl">
              Would you recommend our product to others?
            </h2>
          </section>
          <section className="max-lg:pt-2 p-4 flex items-center">
            <div className=" text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl grid gap-2 w-full">
              {[
                { name: "Definitely", value: feedback.definitely },
                { name: "Probably", value: feedback.probably },
                { name: "Not sure", value: feedback.not_sure },
                { name: "Probably not", value: feedback.probably_not },
                { name: "Definitely not", value: feedback.definitely_not },
              ].map((_, idx) => (
                <p
                  key={idx}
                  data-selected={_.value === selectedOption}
                  className={cn(
                    "border-2 md:border-3 rounded-4xl py-1 md:py-2 px-4 md:px-8",
                    " data-[selected=false]:hover:-translate-y-0.5 transition-all",
                    "data-[selected=false]:active:scale-95",
                    {
                      "border-green-900 bg-green-500/50 hover:bg-green-600 hover:text-green-200 data-[selected=true]:bg-green-800/85 data-[selected=true]:text-green-100":
                        theme === themeEnum.green_grass,
                    },
                    {
                      "border-purple-900 bg-purple-200/50 hover:bg-purple-600 hover:text-purple-200 data-[selected=true]:bg-purple-800/85 data-[selected=true]:text-purple-100":
                        theme === themeEnum.black_plum,
                    },
                    {
                      "border-zinc-900 bg-sky-400/40 hover:bg-zinc-600 hover:text-zinc-200  data-[selected=true]:bg-zinc-800 data-[selected=true]:text-zinc-100":
                        theme === themeEnum.blue_sky,
                    }
                  )}
                  onClick={() => {
                    setSelectedOption(_.value);
                  }}
                >
                  {_.name}
                </p>
              ))}
            </div>
          </section>
        </main>
      </FormCard>
    </FormBGCard>
  );
};
