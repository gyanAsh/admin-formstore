import {
  $current_form,
  selectedFormId,
  selectedWorkspaceId,
} from "@/store/forms/form-elements";
import { useStore } from "@nanostores/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";

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
import { FormCard } from "@/components/forms/v1/card";
import { FormDescription, FormLabel } from "@/components/forms/v1/details";
import { cn } from "@/lib/utils";
import {
  FormDesignAttributes,
  FormTheme,
} from "@/store/forms/designs/design-elements.types";
import { FormProgressBar } from "@/components/forms/v1/progress-bar";
import { FormEmail } from "@/components/forms/v1/elements/email";
import { FormConsent } from "@/components/forms/v1/elements/consent";
import { FormRating } from "@/components/forms/v1/elements/rating";
import { FormText } from "@/components/forms/v1/elements/text";
import { FormWebsite } from "@/components/forms/v1/elements/website";
import { ThemeValues } from "@/store/forms/designs/values";
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
  const currentForm = useStore($current_form);

  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState<"prev" | "next">("next");

  const { elements, design: designAtts } = currentForm;

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

  const progressPercentage = useMemo(() => {
    if (elements.length === 0) return 0;
    return ((currentSection + 1) / elements.length) * 100;
  }, [currentSection, elements.length]);

  const currentElement = elements[currentSection];

  if (elements.length > 0)
    return (
      <section className={cn("h-[100dvh]", className)} {...props}>
        <FormBackground theme={designAtts.theme}>
          {designAtts.addGrainyBG === true && <div className="grain-overlay" />}
          {/* Progress Bar */}
          <FormProgressBar
            progressPercentage={progressPercentage}
            theme={designAtts.theme}
          />

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
                    designAtts={designAtts}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="text-sm absolute flex items-center border-zinc-200 bg-inherit pr-1.5 rounded-xl bottom-4 right-4 space-x-2">
            <div
              className={cn(
                "flex items-center p-1 rounded-xl space-x-1.5 border",
                {
                  " border-zinc-50/60":
                    designAtts.theme === ThemeValues.gradient_forest.value,
                },
                {
                  " border-green-600/40":
                    designAtts.theme === ThemeValues.luxe_minimal_forest.value,
                }
              )}
            >
              <FormNavBtn
                theme={designAtts.theme}
                onClick={() => paginate("prev")}
                disabled={currentSection === 0}
                className="p-0.5 rounded-l-lg"
              >
                <ChevronLeft className="size-5.5 text-zinc-900" />
              </FormNavBtn>
              <FormNavBtn
                onClick={() => paginate("next")}
                theme={designAtts.theme}
                disabled={currentSection === elements.length - 1}
                className="p-0.5 rounded-r-lg"
              >
                <ChevronRight className="size-5.5 text-zinc-900" />
              </FormNavBtn>
            </div>

            <h2 className="ml-1">
              Powered by <b>Formstore</b>
            </h2>
          </div>
        </FormBackground>
      </section>
    );
  else
    return (
      <div className="h-[100dvh]  w-full flex flex-col gap-4 @[64rem]:gap-10 items-center justify-center @container bg-black">
        <h2 className="text-4xl text-center text-red-500 font-bold @[64rem]:text-6xl">
          No Elements Found
        </h2>

        <Button
          variant={"black"}
          className=" @max-[64rem]:scale-75 @max-[64rem]:hover:scale-80 hover:scale-105 w-40 h-12 text-2xl group duration-250"
          effect={"small_scale"}
          asChild
        >
          <Link to={`/dashboard/${workspaceId}/${formId}/create`}>
            <ChevronLeft className="size-7 group-hover:-translate-x-2 duration-250 ease-linear" />
            Go Back{" "}
          </Link>
        </Button>
      </div>
    );
};

export default PreviewFormPage;

const FormNavBtn = ({
  theme,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  theme: FormTheme;
}) => {
  return (
    <button
      className={cn(
        "p-1 rounded not-disabled:hover:scale-105 not-disabled:active:scale-95 duration-100 not-disabled:cursor-pointer bg-gray-300 disabled:opacity-50",
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
  designAtts,
}: {
  formCardClassName?: React.ComponentProps<"div">["className"];
  goNextFunction: Function;
  element: FormElements;
  designAtts: FormDesignAttributes;
}) => {
  return (
    <FormCard
      showTwoCol={Boolean(designAtts.displayTwoColumns)}
      theme={designAtts.theme}
      className={cn(
        "overflow-y-scroll gap-3 zmd:gap-6 @container",
        formCardClassName
      )}
    >
      <section
        className={cn(
          "flex flex-col justify-center  px-2 md:px-8 lg:px-16 gap-2.5 md:gap-5.5 "
        )}
      >
        <FormLabel theme={designAtts.theme}>{element.labels.title}</FormLabel>
        <FormDescription theme={designAtts.theme}>
          {element.labels.description}
        </FormDescription>
      </section>
      <section
        className={cn(
          "scale-90 @[64rem]:scale-100 flex justify-center font-['Roboto','sans-serif']",
          {
            "font-['Playfair_Display','serif'] font-light":
              designAtts.theme === ThemeValues.luxe_minimal_forest.value,
          }
        )}
      >
        {element.field === "email" ? (
          <FormEmail
            email={element.validations as EmailValidation}
            theme={designAtts.theme}
            goNextFunction={goNextFunction}
          />
        ) : element.field === "consent" ? (
          <FormConsent
            consent={element.validations as ConsentValidation}
            theme={designAtts.theme}
            goNextFunction={goNextFunction}
          />
        ) : element.field === "rating" ? (
          <FormRating
            rating={element.validations as RatingValidation}
            theme={designAtts.theme}
            goNextFunction={goNextFunction}
          />
        ) : element.field === "text" ? (
          <FormText
            text={element.validations as TextValidation}
            theme={designAtts.theme}
            goNextFunction={goNextFunction}
          />
        ) : element.field === "website" ? (
          <FormWebsite
            url={element.validations as UrlValidation}
            theme={designAtts.theme}
            goNextFunction={goNextFunction}
          />
        ) : (
          <p>{element.field}</p>
        )}
      </section>
    </FormCard>
  );
};
