import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useParams } from "react-router";

import { AnimatePresence, motion } from "motion/react";
import { FormTypes } from "@/pages/v1/types/elements.types";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";

import { cn, delay } from "@/lib/utils";
import { FormEmail } from "./component/elements/email";
import { FormConsent } from "./component/elements/consent";
import { FormRating } from "./component/elements/rating";
import { FormText } from "./component/elements/text";
import { FormWebsite } from "./component/elements/website";
import { FormProgressBar } from "./component/progress-bar";
import { FormCard, InputContainer } from "./component/card";
import {
  DetailsContainer,
  FormDescription,
  FormLabel,
} from "./component/details";
import type {
  AddressValidation,
  ConsentValidation,
  DateValidation,
  EmailValidation,
  FormElements,
  Forms,
  LongTextValidation,
  MultiSelectValidation,
  NumberValidation,
  PhoneValidation,
  RankingValidation,
  RatingValidation,
  SingleSelectValidation,
  TextValidation,
  UrlValidation,
  WelcomeValidation,
  YesNoValidation,
} from "./types/elements.types";
import { FormBackground } from "./component/background";
import { useFormV1Store } from "./state/design";
import { useQuery } from "@tanstack/react-query";
import { fetchForm } from "./endpoint";
import {
  FormExitScreen,
  FormWelcomeScreen,
} from "./component/elements/screens";
import { GridAnimate, TextFade } from "./component/animated";
import { FormYesNo } from "./component/elements/yes-no";
import { FormSingleSelect } from "./component/elements/single-select";
import { FormMultiSelect } from "./component/elements/multi-select";
import { FormNPS } from "./component/elements/nps";
import { FormRanking } from "./component/elements/ranking";
import { FormLongText } from "./component/elements/long-text";
import { FormPhone } from "./component/elements/phone";
import { FormNumber } from "./component/elements/number";
import { FormAddress } from "./component/elements/address";
import { FormDate } from "./component/elements/date";

const variants = {
  enter: (direction: "prev" | "next") => ({
    x: direction === "prev" ? -100 : 100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: (direction: "prev" | "next") => ({
    x: direction === "prev" ? 100 : -100,
    opacity: 0,
    transition: { duration: 0.3 },
  }),
};

const PreviewFormPage = ({
  formCardClassName,
  className,
  ...props
}: React.ComponentProps<"section"> & {
  formCardClassName?: React.ComponentProps<"div">["className"];
}) => {
  const { formId } = useParams();
  const setFormState = useFormV1Store((state) => state.setFormState);

  const { isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const data = await fetchForm(formId!);
        let formData: Forms = {
          id: data.form.id,
          title: data.form.title,
          elements: data.elements,
          design: data.form.design,
        };
        setFormState(formData);
        await delay(2000);
        return data;
      } catch (err) {
        console.error(err);
      }
      return [];
    },
    refetchOnWindowFocus: false,
  });

  const elements = useFormV1Store((state) => state.elements);

  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState<"prev" | "next">("next");

  // Memoize the paginate function to prevent it from being recreated on every render
  const paginate = useCallback(
    (newDirection: "prev" | "next") => {
      setDirection(newDirection);
      setCurrentSection((prev) =>
        newDirection === "next"
          ? Math.min(prev + 1, elements.length - 1)
          : Math.max(prev - 1, 0)
      );
    },
    [elements.length]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeElement = document.activeElement as HTMLElement;

      // Skip if focused on input, textarea or contenteditable
      if (
        activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA" ||
        activeElement.isContentEditable
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        const prevBtn = document.getElementById(
          "goPrevForm"
        ) as HTMLButtonElement;
        if (!!prevBtn) {
          prevBtn.focus();
          prevBtn.click();
        }
      } else if (event.key === "ArrowRight") {
        const nextBtn = document.getElementById(
          "goNextForm"
        ) as HTMLButtonElement;
        if (!!nextBtn) {
          nextBtn.focus();
          nextBtn.click();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const progressPercentage = useMemo(() => {
    if (elements.length === 0) return 0;
    return ((currentSection + 1) / elements.length) * 100;
  }, [currentSection, elements.length]);

  const currentElement = elements[currentSection];
  if (isLoading)
    return (
      <section
        className={cn(
          "h-[100dvh] w-full flex items-center justify-center",
          className
        )}
        {...props}
      >
        <FormBackground className="h-full w-full">
          <TextFade
            direction="down"
            className="pt-0 pb-5 flex-col flex justify-center items-center space-y-0 w-full h-full gap-4"
          >
            <h2 className="text-lg text-center tracking-tighter">
              Made with{" "}
              <b>
                <i className="font-['Playfair_Display','serif']">The</i>&nbsp;
                Formstore
              </b>
            </h2>
            <GridAnimate className="size-16" />
          </TextFade>
        </FormBackground>
      </section>
    );
  else if (isError) return <div>Error: {(error as Error).message}</div>;
  else if (elements.length > 0)
    return (
      <section className={cn("h-[100dvh]", className)} {...props}>
        <FormBackground>
          {/* Progress Bar */}
          <FormProgressBar progressPercentage={progressPercentage} />

          {/* Sections */}
          <div className="h-full overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              {currentElement && (
                <motion.div
                  key={currentElement.seq_number}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full"
                >
                  <FormPage
                    formCardClassName={formCardClassName}
                    goNextFunction={() => paginate("next")}
                    element={currentElement}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div
            className={cn(
              "text-sm absolute bg-[var(--bg-color)] w-full flex items-center justify-center text-[var(--label-text-color)] pb-4 pt-1 bottom-0 right-0 space-x-2",
              { "scale-85": !!formCardClassName }
            )}
          >
            <div className={cn("flex items-center max-md:hidden")}>
              <FormNavBtn
                id="goPrevForm"
                onClick={() => paginate("prev")}
                disabled={currentSection === 0}
                className="rounded-full px-2.5 py-1.5 text-[var(--label-text-color)] backdrop-blur-md bg-white/20 border-2 border-r-[1.5px] border-[var(--label-text-color)]/50 rounded-r-none"
              >
                <ChevronLeft strokeWidth={3} className="size-5" />
              </FormNavBtn>
              <FormNavBtn
                id="goNextForm"
                onClick={() => paginate("next")}
                disabled={currentSection === elements.length - 1}
                className="rounded-full px-2.5 py-1.5 text-[var(--label-text-color)] backdrop-blur-md bg-white/20 border-2 border-l-[1.5px] border-[var(--label-text-color)]/50 rounded-l-none"
              >
                <ChevronRight strokeWidth={3} className="size-5" />
              </FormNavBtn>
            </div>
          </div>
          {/* Water Mark*/}
          <div
            className={cn(
              "text-sm absolute max-md:bg-[var(--bg-color)] flex flex-col items-center justify-end max-md:w-full gap-1.5 text-[var(--label-text-color)] bottom-0 min-md:right-0 p-2 px-4 min-md:p-4 space-x-2",
              { "scale-85": !!formCardClassName }
            )}
          >
            <div className={cn("flex items-center w-full grow min-md:hidden")}>
              <FormNavBtn
                id="goPrevForm"
                onClick={() => paginate("prev")}
                disabled={currentSection === 0}
                className="rounded-full flex items-center justify-center grow py-2 text-[var(--label-text-color)] backdrop-blur-md bg-white/20 border-2 border-r-[1.5px] border-[var(--label-text-color)]/50 rounded-r-none"
              >
                <ChevronLeft strokeWidth={3} className="size-5" />
              </FormNavBtn>
              <FormNavBtn
                id="goNextForm"
                onClick={() => paginate("next")}
                disabled={currentSection === elements.length - 1}
                className="rounded-full flex items-center justify-center grow py-2 text-[var(--label-text-color)] backdrop-blur-md bg-white/20 border-2 border-l-[1.5px] border-[var(--label-text-color)]/50 rounded-l-none"
              >
                <ChevronRight strokeWidth={3} className="size-5" />
              </FormNavBtn>
            </div>
            <h2 className=" text-sm sm:text-base md:text-lg text-center tracking-tighter">
              Made with{" "}
              <b>
                <i className=" font-['Playfair_Display','serif']">The</i>&nbsp;
                Formstore
              </b>
            </h2>
          </div>
        </FormBackground>
      </section>
    );
  else
    return (
      <div
        className={cn(
          "h-[100dvh] w-full flex flex-col gap-4 @[64rem]:gap-10 items-center justify-center @container bg-black"
        )}
      >
        <h2 className="text-4xl flex items-center justify-center gap-5 text-center text-zinc-200 font-bold @[64rem]:text-6xl">
          <Info className="size-8" /> Form Not Found
        </h2>
      </div>
    );
};

export default PreviewFormPage;

const FormNavBtn = ({
  className,
  ...props
}: React.ComponentProps<"button"> & {}) => {
  return (
    <button
      className={cn(
        "p-1 rounded not-disabled:hover:scale-105 not-disabled:active:scale-95 duration-100 not-disabled:cursor-pointer bg-gray-500/75 disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};

const FormPage = ({
  formCardClassName,
  goNextFunction,
  element,
}: {
  formCardClassName?: React.ComponentProps<"div">["className"];
  goNextFunction: Function;
  element: FormElements;
}) => {
  const { pathname } = useLocation();
  let isPreview = pathname.includes("preview");
  const elContianer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let el = elContianer.current;
    if (!isPreview || !el) return;

    let canRun = true;
    let touchStartY = 0;
    let scrollNextCount = 0,
      scrollPrevCount = 0;

    const runThrottled = (callback: () => void) => {
      if (!canRun) return;
      canRun = false;
      callback();
      setTimeout(() => {
        canRun = true;
      }, 1000); // throttle duration
    };

    const goPrev = () => {
      scrollPrevCount++;
      if (scrollPrevCount >= 1) {
        scrollPrevCount = 0;

        const prevBtn = document.getElementById(
          "goPrevForm"
        ) as HTMLButtonElement;
        let isAtTop = el.scrollTop <= 2;

        if (prevBtn && isAtTop) {
          prevBtn.focus();
          prevBtn.click();
        }
      }
    };

    const goNext = () => {
      scrollNextCount++;
      if (scrollNextCount >= 1) {
        scrollNextCount = 0;

        const nextBtn = document.getElementById(
          "goNextForm"
        ) as HTMLButtonElement;
        let isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;

        if (nextBtn && isAtBottom) {
          nextBtn.focus();
          nextBtn.click();
        }
      }
    };

    const onWheel = (event: WheelEvent) => {
      // Scroll down triggers next
      if (event.deltaY > 40) {
        runThrottled(() => goNext());
        // Scroll up triggers previous
      } else if (event.deltaY < -40) {
        runThrottled(() => goPrev());
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      // Swipe down to go to the previous slide
      if (deltaY < -40) {
        runThrottled(() => goPrev());
        // Swipe up to go to the next slide
      } else if (deltaY > 40) {
        runThrottled(() => goNext());
      }
    };

    const timeoutId = setTimeout(() => {
      elContianer.current?.addEventListener("wheel", onWheel, {
        passive: true,
      });
      elContianer.current?.addEventListener("touchstart", onTouchStart, {
        passive: true,
      });
      elContianer.current?.addEventListener("touchend", onTouchEnd, {
        passive: true,
      });
    }, 1000); // wait 1s before enabling

    return () => {
      clearTimeout(timeoutId);
      elContianer.current?.removeEventListener("wheel", onWheel);
      elContianer.current?.removeEventListener("touchstart", onTouchStart);
      elContianer.current?.removeEventListener("touchend", onTouchEnd);
    };
  }, [isPreview]);
  return (
    <FormCard
      ref={elContianer}
      className={cn(
        "overflow-y-auto py-18 md:py-16 @container",
        formCardClassName
      )}
    >
      <DetailsContainer>
        <FormLabel
          className={cn({
            "after:content-['*'] after:ml-1.5": !!element.required,
          })}
        >
          {element.label}
        </FormLabel>
        <FormDescription>{element.description}</FormDescription>
      </DetailsContainer>

      <InputContainer hidden={[FormTypes.exit].some((e) => e === element.type)}>
        {element.type === FormTypes.email ? (
          <FormEmail
            email={element.properties as EmailValidation}
            seq_number={element.seq_number}
            goNextFunction={goNextFunction}
          />
        ) : element.type === FormTypes.phone ? (
          <FormPhone
            phone={element.properties as PhoneValidation}
            seq_number={element.seq_number}
            goNextFunction={goNextFunction}
          />
        ) : element.type === FormTypes.number ? (
          <FormNumber
            number={element.properties as NumberValidation}
            goNextFunction={goNextFunction}
          />
        ) : element.type === FormTypes.date ? (
          <FormDate
            number={element.properties as DateValidation}
            goNextFunction={goNextFunction}
          />
        ) : element.type === FormTypes.consent ? (
          <FormConsent
            consent={element.properties as ConsentValidation}
            seq_number={element.seq_number}
            goNextFunction={goNextFunction}
          />
        ) : element.type === FormTypes.address ? (
          <FormAddress
            address={element.properties as AddressValidation}
            seq_number={element.seq_number}
            goNextFunction={goNextFunction}
          />
        ) : element.type === FormTypes.yesno ? (
          <FormYesNo
            yesno={element.properties as YesNoValidation}
            seq_number={element.seq_number}
            goNextFunction={goNextFunction}
          />
        ) : element.type === FormTypes.ranking ? (
          <FormRanking
            ranking={element.properties as RankingValidation}
            seq_number={element.seq_number}
            goNextFunction={goNextFunction}
          />
        ) : element.type === FormTypes.rating ? (
          <FormRating
            rating={element.properties as RatingValidation}
            seq_number={element.seq_number}
            goNextFunction={goNextFunction}
          />
        ) : element.type === FormTypes.nps ? (
          <FormNPS
            goNextFunction={goNextFunction}
            seq_number={element.seq_number}
          />
        ) : element.type === FormTypes.text ? (
          <FormText
            text={element.properties as TextValidation}
            seq_number={element.seq_number}
            goNextFunction={goNextFunction}
          />
        ) : element.type === FormTypes.long_text ? (
          <FormLongText
            long_text={element.properties as LongTextValidation}
            seq_number={element.seq_number}
            goNextFunction={goNextFunction}
          />
        ) : element.type === FormTypes.singleSelect ? (
          <FormSingleSelect
            singleSelect={element.properties as SingleSelectValidation}
            seq_number={element.seq_number}
            goNextFunction={goNextFunction}
          />
        ) : element.type === FormTypes.multiselect ? (
          <FormMultiSelect
            multiSelect={element.properties as MultiSelectValidation}
            seq_number={element.seq_number}
            goNextFunction={goNextFunction}
          />
        ) : element.type === FormTypes.url ? (
          <FormWebsite
            url={element.properties as UrlValidation}
            seq_number={element.seq_number}
            goNextFunction={goNextFunction}
          />
        ) : element.type === FormTypes.welcome ? (
          <FormWelcomeScreen
            goNextFunction={goNextFunction}
            welcome={element.properties as WelcomeValidation}
          />
        ) : element.type === FormTypes.exit ? (
          <FormExitScreen goNextFunction={goNextFunction} />
        ) : (
          <p>{element.type}</p>
        )}
      </InputContainer>
    </FormCard>
  );
};
// {
//   "message": "form successfull published",
//   "public_id": "35b0669c-18a2-41d6-9570-8f3e11e264cc"
// }
