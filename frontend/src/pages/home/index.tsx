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
import {
  ArrowLeftToLine,
  ChevronLeft,
  ChevronRight,
  Droplet,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import AppointmentDateAndTimePicker from "@/components/custom-input/appointment-date-picker";
import { Label } from "@/components/ui/label";
import { getLocalTimeZone, today } from "@internationalized/date";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "@/lib/embla-carousel-nav-btns";

export default memo(function Home() {
  return (
    <main
      className="flex min-h-screen w-full flex-col items-center justify-center relative isolate
      [background-image:radial-gradient(at_58%_82%,_#92c7cf_0px,_transparent_50%),radial-gradient(at_2%_78%,_#aad7d9_0px,_transparent_50%),radial-gradient(at_13%_39%,_#fbf9f1_0px,_transparent_50%),radial-gradient(at_79%_29%,_#e5e1da_0px,_transparent_50%)] bg-[#92c7cf]
      dark:bg-[#181818] dark:[background-image:radial-gradient(at_70%_84%,_#181818_0%,_transparent_60%),_radial-gradient(at_36%_99%,_#8758ff_0%,_transparent_50%),_radial-gradient(at_35%_62%,_#5cb8e4_0%,_transparent_40%),_radial-gradient(at_28%_50%,_#f2f2f2_0%,_transparent_30%)]
      "
    >
      <section className="flex flex-col items-center justify-center grow min-h-[55dvh] sm:h-[55dvh] w-full relative">
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4500 }),
  ]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <>
      <div className="w-full flex items-center justify-center relative">
        <div className=" overflow-hidden pt-8" ref={emblaRef}>
          <div className="flex px-[calc(1rem_*_-1)] touch-pan-y touch-pinch-zoom">
            <section
              className={cn(
                "mx-2 flex-[0_0_80%] xl:flex-[0_0_1014px] bg-lime-300  rounded-t-3xl border ",
                "overflow-hidden font-['Cal_Sans','sans-serif']",
                "grid md:grid-cols-2 grow"
              )}
            >
              <section className="overflow-hidden rounded-[0%_0%_0%_40%/0%_0%_0%_40%] md:rounded-[0%_40%_0%_0%/0%_40%_0%_0%]">
                <img
                  src={"/background/fishing-net.jpg"}
                  alt={"alt"}
                  className={cn(" max-md:w-full md:h-full  object-cover")}
                />
              </section>
              <section className="rounded flex flex-col text-center items-center justify-center p-6 gap-0">
                <img
                  alt="Logo"
                  loading="lazy"
                  className="[mix-blend-mode:multiply] flex items-center justify-center w-fit rounded size-9 mb-4"
                  src="/formstore-logo-light.svg"
                />
                <h1
                  className={cn(
                    "text-3xl md:text-4xl lg:text-5xl tracking-wider font-semibold text-emerald-900 mb-4"
                    // "[text-shadow:0px_0px_4px_#fff]",
                    // "[paint-order:stroke_fill] [-webkit-text-stroke:8px_oklch(43.2%_0.095_166.913)]"
                  )}
                >
                  Product Feedback Survey
                </h1>
                <p
                  className={cn(
                    "text-emerald-900  text-base lg:text-xl tracking-wide mb-12"
                    // "[text-shadow:0px_0px_2px_#fff]"
                    // "[paint-order:stroke_fill] [-webkit-text-stroke:2px_#000]"
                  )}
                >
                  {`We’re always looking to improve and would love to hear your
                  thoughts. Your feedback helps us enhance your experience and
                  build better features. All responses are completely
                  confidential.`}
                </p>
                <button
                  onClick={onNextButtonClick}
                  className="w-fit  tracking-wide bg-zinc-900  text-white py-2 px-4 rounded-full cursor-pointer hover:bg-zinc-100 hover:text-zinc-950 transition-colors duration-200"
                >
                  Start Survey
                </button>
              </section>
            </section>
            <section className="mx-2 flex-[0_0_80%] xl:flex-[0_0_1014px] ">
              <GoBoldForm />
            </section>

            <div
              className={cn(
                "mx-2 flex-[0_0_80%] sm:flex-[0_0_300px] md:flex-[0_0_390px] p-6 rounded-t-3xl",
                "bg-[url('/background/black-dots.svg')] bg-repeat"
              )}
            >
              {/* <h2 className="text-5xl text-white"> toggle form element</h2> */}
              <GoBoldMobileForm />
            </div>

            <div
              className={cn(
                "mx-2 flex-[0_0_80%] xl:flex-[0_0_1014px] p-6 rounded-t-3xl",
                "border border-zinc-400 bg-gray-300  font-['Playfair_Display','serif']",
                "flex flex-col"
              )}
            >
              {/* <h2 className="text-5xl text-white">
                toggle form validation date
              </h2> */}

              <ModernPages />
            </div>
          </div>
        </div>
        <section className="absolute max-sm:w-full right-0 sm:right-3 bottom-0 sm:bottom-3 flex items-center max-sm:justify-center bg-sky-100 max-md:p-2 p-3 md:rounded-full space-x-2.5">
          <div className="flex items-center gap-1.5">
            <button
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
              className="rounded md:rounded-md  bg-black hover:bg-slate-800 text-white flex items-center justify-center max-sm:size-5 size-6 md:size-7 "
            >
              <ChevronLeft className="text-inherit" />
            </button>
            <button
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
              className="rounded md:rounded-md bg-black hover:bg-slate-800 text-white flex items-center justify-center max-sm:size-5 size-6 md:size-7 "
            >
              <ChevronRight className="text-inherit" />
            </button>
          </div>

          <h2 className="text-xs sm:text-sm md:text-base font-semibold text-slate-900">
            Build with{" "}
            <span
              className={cn(
                "bg-clip-text text-transparent",
                // "bg-gradient-to-r from-15% from-cyan-500 to-green-500"
                // "bg-radial from-15%",
                // " from-teal-400 to-lime-500",
                " bg-gradient-to-tl from-blue-700 to-purple-700"
                // "dark:from-blue-400 dark:to-purple-400"
              )}
            >
              Formstore
            </span>
          </h2>
        </section>
      </div>
    </>
  );
};

// ------------Component------------
const GoBoldMobileForm = () => {
  return (
    <GoBoldMobileForm.Card className=" overflow-y-auto h-full font-['Roboto','sans-serif'] ffont-['IBM_Plex_Serif','serif'] text-zinc-950 ">
      <GoBoldMobileForm.ImageContent className="bg-violet-950">
        <img src="/background/razor.jpg" />
      </GoBoldMobileForm.ImageContent>
      <GoBoldMobileForm.QuestionContent className="bg-violet-950 text-pink-200 text-lg md:text-xl lg:text-2xl p-5 flex items-center justify-center font-semibold leading-6.5">
        <h2>What did you like most about our product?</h2>
      </GoBoldMobileForm.QuestionContent>
      <GoBoldMobileForm.ElementContent className="bg-violet-950 text-sm md:text-base pb-5 px-3 flex items-center justify-center flex-col">
        <input
          type="text"
          placeholder="Share your favorite thing..."
          className={cn(
            "w-full px-1 font-medium transition-all duration-300  placeholder:tracking-tight",
            "focus:outline-none line-clamp-3 focus:placeholder:text-zinc-500 placeholder:text-violet-950",
            " w-full border p-2 px-4 srounded-full bg-pink-200 border-zinc-500 focus:border-violet-500 focus:border-[1.5px] duration-0 mb-[1px] focus:mb-0"
            // "relative before:content-['“'] after:content-['”'] before:absolute after:absolute before:-left-4 after:-right-4",
          )}
        />
      </GoBoldMobileForm.ElementContent>
    </GoBoldMobileForm.Card>
  );
};
GoBoldMobileForm.Card = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "duration-300 size-full",
        " flex flex-col items-center justify-center",
        className
      )}
      {...props}
    />
  );
};

GoBoldMobileForm.ImageContent = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("duration-300 p-1 w-full aspect-4/3", className)}
      {...props}
    />
  );
};
GoBoldMobileForm.QuestionContent = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("duration-300 zp-1 w-full min-h-24", className)}
      {...props}
    />
  );
};
GoBoldMobileForm.ElementContent = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("duration-300 zp-1 w-full min-h-16", className)}
      {...props}
    />
  );
};

// ------------Component------------
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
        <section className="max-md:scale-70 absolute flex items-center gap-1 top-0 -left-6 md:left-0 -translate-y-1/3">
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
            "xl:grid xl:grid-cols-2",
            "flex flex-col max-md:justify-center",
            " lg:gap-2 xl:gap-4  lg:p-10 xl:p-0"
          )}
        >
          <section className="[mix-blend-mode:multiply] grayscale absolute bottom-5 left-10 size-8 flex items-center gap-2">
            <img alt="Logo" loading="lazy" src="/formstore-logo-light.svg" />
            <h2 className="text-xl">Formstore</h2>
          </section>

          <section className="max-lg:pb-3 p-4 flex items-center">
            <h2 className=" text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl">
              Would you recommend our service to others?
            </h2>
          </section>
          <section className="max-lg:pt-2 p-4 flex items-center">
            <div className=" text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl grid gap-2 w-full">
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
                    "border-2 md:border-3 rounded-4xl sm:py-1 md:py-2 px-4 md:px-8",
                    " data-[selected=false]:hover:-translate-y-0.5 transition-all",
                    "data-[selected=false]:active:scale-95",
                    {
                      "border-green-900 bg-green-500/50 hover:bg-green-600 hover:text-green-200 data-[selected=true]:bg-green-800/85 data-[selected=true]:text-green-100":
                        theme === themeEnum.green_grass,
                    },
                    {
                      "border-purple-900 bg-purple-200/50 hover:bg-purple-500/90 hover:text-purple-200 data-[selected=true]:bg-purple-800/85 data-[selected=true]:text-purple-100":
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

// ------------Component------------
const ModernPages = () => {
  const now = today(getLocalTimeZone());

  return (
    <div className="max-sm:h-[433.33px] grow overflow-y-auto grid md:grid-cols-2 gap-2">
      <section
        className={cn(
          "relative overflow-hidden h-full rounded-[calc(24px)]",
          "min-h-[220px]"
        )}
      >
        <img
          src={"/background/butler-dupe.jpeg"}
          alt={"alt"}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      <section
        className={cn(
          "relative overflow-y-auto h-full bg-red-200 rounded-[calc(24px)] p-8",
          "grid space-y-5",
          "min-h-[320px]"
        )}
      >
        <img
          alt="Logo"
          loading="lazy"
          className="[mix-blend-mode:multiply] flex items-center justify-center w-full size-8"
          src="/formstore-logo-light.svg"
        />
        <div className=" max-w-[450px] flex flex-col gap-3">
          <h2 className=" text-xl leading-5 sm:text-2xl sm:leading-6 md:text-4xl md:leading-10 text-wrap font-bold text-zinc-800  ">
            What is your preferred appointment date?
          </h2>
          <p className="text-zinc-800/90 text-sm md:text-base border-">
            Appointments can be scheduled up to 30 days in advance.
          </p>
        </div>

        <AppointmentDateAndTimePicker
          dataSegment_className="data-focused:text-zinc-900 data-focused:bg-red-300 text-zinc-900 data-placeholder:text-zinc-900 data-focused:data-placeholder:text-white"
          dateInput_className="data-focus-within:ring-red-300 data-focus-within:border-zinc-900"
          aria-label="Appointment Date"
          calendar_bg_theme="light"
          calendar_tw_color="red"
          minValue={now.add({ days: 1 })}
          maxValue={now.add({ days: 30 + 1 })}
        />
      </section>
    </div>
  );
};

export const GrainOverlay = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div className={cn("relative", className)} {...props}>
      {children}
      <div className="grain-overlay" />
    </div>
  );
};
