import {
  $current_form,
  selectedFormId,
  selectedWorkspaceId,
} from "@/store/forms/form-elements";
import { useStore } from "@nanostores/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router";

import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  AddressValidation,
  ConsentValidation,
  DropdownValidation,
  EmailValidation,
  FormElements,
  FormFields,
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
} from "@/store/forms/form-elements.types";
import { FormBackground } from "@/components/forms/v1/background";
import { FormCard, InputContainer } from "@/components/forms/v1/card";
import {
  DetailsContainer,
  FormDescription,
  FormLabel,
} from "@/components/forms/v1/details";
import { cn } from "@/lib/utils";
import { FormProgressBar } from "@/components/forms/v1/progress-bar";
import { FormEmail } from "@/components/forms/v1/elements/email";
import { FormConsent } from "@/components/forms/v1/elements/consent";
import { FormRating } from "@/components/forms/v1/elements/rating";
import { FormText } from "@/components/forms/v1/elements/text";
import { FormWebsite } from "@/components/forms/v1/elements/website";
import {
  FormExitScreen,
  FormWelcomeScreen,
} from "@/components/forms/v1/elements/screens";
import { FormYesNo } from "@/components/forms/v1/elements/yes-no";
import { FormDropdown } from "@/components/forms/v1/elements/dropdown";
import { FormSingleSelect } from "@/components/forms/v1/elements/single-select";
import { FormMultiSelect } from "@/components/forms/v1/elements/multi-select";
import { FormNPS } from "@/components/forms/v1/elements/nps";
import { FormRanking } from "@/components/forms/v1/elements/ranking";
import { FormLongText } from "@/components/forms/v1/elements/long-text";
import { FormPhone } from "@/components/forms/v1/elements/phone";
import { FormNumber } from "@/components/forms/v1/elements/number";
import { FormAddress } from "@/components/forms/v1/elements/address";
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
  const { workspaceId, formId } = useParams();
  const { pathname } = useLocation();
  let isPreview = pathname.includes("preview");

  const currentForm = useStore($current_form);

  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState<"prev" | "next">("next");

  const { elements } = currentForm;

  useEffect(() => {
    selectedWorkspaceId.set(workspaceId);
    selectedFormId.set(formId);
  }, [formId, workspaceId]);

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

  if (elements.length > 0)
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
                  key={currentElement.id}
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
                    isPreview={isPreview}
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
          "h-[80dvh] rounded-4xl w-full flex flex-col gap-4 @[64rem]:gap-10 items-center justify-center @container bg-black",
          {
            "h-[100dvh]": isPreview,
          }
        )}
      >
        <h2 className="text-4xl text-center text-zinc-200 font-bold @[64rem]:text-6xl">
          No Elements Found
        </h2>

        <Button
          variant={"black"}
          className=" @max-[64rem]:scale-75 @max-[64rem]:hover:scale-80 hover:scale-105 w-40 h-12 text-2xl group duration-250"
          effect={"small_scale"}
          asChild
        >
          {isPreview && (
            <Link to={`/dashboard/${workspaceId}/${formId}/create`}>
              <ChevronLeft className="size-7 group-hover:-translate-x-2 duration-250 ease-linear" />
              Go Back{" "}
            </Link>
          )}
        </Button>
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
        "p-1 rounded not-disabled:active:scale-95 duration-100 not-disabled:cursor-pointer bg-gray-500/75 disabled:opacity-50",
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
  isPreview,
}: {
  formCardClassName?: React.ComponentProps<"div">["className"];
  goNextFunction: Function;
  element: FormElements;
  isPreview: boolean;
}) => {
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
          {element.labels.title}
        </FormLabel>
        <FormDescription>{element.labels.description}</FormDescription>
      </DetailsContainer>

      <InputContainer
        hidden={[FormFields.exit].some((e) => e === element.field)}
      >
        {element.field === FormFields.email ? (
          <FormEmail
            email={element.validations as EmailValidation}
            goNextFunction={goNextFunction}
          />
        ) : element.field === FormFields.address ? (
          <FormAddress
            address={element.validations as AddressValidation}
            goNextFunction={goNextFunction}
          />
        ) : element.field === FormFields.consent ? (
          <FormConsent
            consent={element.validations as ConsentValidation}
            goNextFunction={goNextFunction}
          />
        ) : element.field === FormFields.dropdown ? (
          <FormDropdown
            dropdown={element.validations as DropdownValidation}
            goNextFunction={goNextFunction}
          />
        ) : element.field === FormFields.singleSelect ? (
          <FormSingleSelect
            singleSelect={element.validations as SingleSelectValidation}
            goNextFunction={goNextFunction}
          />
        ) : element.field === FormFields.nps ? (
          <FormNPS goNextFunction={goNextFunction} />
        ) : element.field === FormFields.ranking ? (
          <FormRanking
            ranking={element.validations as RankingValidation}
            goNextFunction={goNextFunction}
          />
        ) : element.field === FormFields.number ? (
          <FormNumber
            number={element.validations as NumberValidation}
            goNextFunction={goNextFunction}
          />
        ) : element.field === FormFields.phone ? (
          <FormPhone
            phone={element.validations as PhoneValidation}
            goNextFunction={goNextFunction}
          />
        ) : element.field === FormFields.multiselect ? (
          <FormMultiSelect
            multiSelect={element.validations as MultiSelectValidation}
            goNextFunction={goNextFunction}
          />
        ) : element.field === FormFields.yesno ? (
          <FormYesNo
            yesno={element.validations as YesNoValidation}
            goNextFunction={goNextFunction}
          />
        ) : element.field === FormFields.rating ? (
          <FormRating
            rating={element.validations as RatingValidation}
            goNextFunction={goNextFunction}
          />
        ) : element.field === FormFields.text ? (
          <FormText
            text={element.validations as TextValidation}
            goNextFunction={goNextFunction}
          />
        ) : element.field === FormFields.long_text ? (
          <FormLongText
            long_text={element.validations as LongTextValidation}
            goNextFunction={goNextFunction}
          />
        ) : element.field === FormFields.url ? (
          <FormWebsite
            url={element.validations as UrlValidation}
            goNextFunction={goNextFunction}
          />
        ) : element.field === FormFields.welcome ? (
          <FormWelcomeScreen
            goNextFunction={goNextFunction}
            welcome={element.validations as WelcomeValidation}
          />
        ) : element.field === FormFields.exit ? (
          <FormExitScreen goNextFunction={goNextFunction} />
        ) : (
          <p>{element.field}</p>
        )}
      </InputContainer>
    </FormCard>
  );
};
