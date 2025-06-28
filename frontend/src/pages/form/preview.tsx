import {
  $current_form,
  selectedFormId,
  selectedWorkspaceId,
} from "@/store/forms/form-elements";
import { useStore } from "@nanostores/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router";

import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  ConsentValidation,
  EmailValidation,
  FormElements,
  RatingValidation,
  TextValidation,
  UrlValidation,
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
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="text-sm absolute flex items-center border-zinc-200 bg-black text-white p-1.5 rounded-[6px] bottom-4 right-4 space-x-2">
            <div className={cn("flex items-center space-x-0.5")}>
              <FormNavBtn
                id="goPrevForm"
                onClick={() => paginate("prev")}
                disabled={currentSection === 0}
                className="p-0.5 rounded-l-lg"
              >
                <ChevronLeft className="size-5 text-gray-50" />
              </FormNavBtn>
              <FormNavBtn
                id="goNextForm"
                onClick={() => paginate("next")}
                disabled={currentSection === elements.length - 1}
                className="p-0.5 rounded-r-lg"
              >
                <ChevronRight className="size-5 text-gray-50" />
              </FormNavBtn>
            </div>

            <h2 className="ml-0.5 text-sm">
              Made with <b>Formstore</b>
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
  return (
    <FormCard
      className={cn(
        "overflow-y-scroll py-16 md:py-9 @container",
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

      <InputContainer>
        {element.field === "email" ? (
          <FormEmail
            email={element.validations as EmailValidation}
            goNextFunction={goNextFunction}
          />
        ) : element.field === "consent" ? (
          <FormConsent
            consent={element.validations as ConsentValidation}
            goNextFunction={goNextFunction}
          />
        ) : element.field === "rating" ? (
          <FormRating
            rating={element.validations as RatingValidation}
            goNextFunction={goNextFunction}
          />
        ) : element.field === "text" ? (
          <FormText
            text={element.validations as TextValidation}
            goNextFunction={goNextFunction}
          />
        ) : element.field === "website" ? (
          <FormWebsite
            url={element.validations as UrlValidation}
            goNextFunction={goNextFunction}
          />
        ) : (
          <p>{element.field}</p>
        )}
      </InputContainer>
    </FormCard>
  );
};
