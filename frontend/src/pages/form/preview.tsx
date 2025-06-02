import { $all_forms } from "@/store/forms/form-elements";
import { useStore } from "@nanostores/react";
import { useCallback, useMemo, useState } from "react";
import { Link, useParams } from "react-router";

import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import {
  ConsentValidation,
  EmailValidation,
  FormElements,
  RatingValidation,
  TextValidation,
  UrlValidation,
} from "@/store/forms/form-elemets.types";
import { $form_design_atts } from "@/store/designs/design-elements";
import { FormBackground } from "@/components/ui-dynamic-form/background";
import { FormCard } from "@/components/ui-dynamic-form/card";
import {
  FormDescription,
  FormLabel,
} from "@/components/ui-dynamic-form/details";
import { cn } from "@/lib/utils";
import {
  FormDesignAttributes,
  FormTheme,
} from "@/store/designs/design-elements.types";
import { FormProgressBar } from "@/components/ui-dynamic-form/progress-bar";
import { FormEmail } from "@/components/ui-dynamic-form/elements/email";
import { FormConsent } from "@/components/ui-dynamic-form/elements/consent";
import { FormRating } from "@/components/ui-dynamic-form/elements/rating";
import { FormText } from "@/components/ui-dynamic-form/elements/text";
import { FormWebsite } from "@/components/ui-dynamic-form/elements/website";
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

const FullPageScroll = () => {
  const { workspaceId, formId } = useParams();
  const allForms = useStore($all_forms);
  const designAtts = useStore($form_design_atts);

  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState<"prev" | "next">("next");

  // Memoize the derived 'elements' array to prevent recalculation on every render
  const elements = useMemo(() => {
    return (
      allForms.find(
        (form) => form.id === formId && form.workspaceId === workspaceId
      )?.elements || []
    );
  }, [allForms, formId, workspaceId]);

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
      <FormBackground theme={designAtts.theme}>
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
                className="absolute w-full h-full"
              >
                <FormPage
                  goNextFunction={() => paginate("next")}
                  element={currentElement}
                  designAtts={designAtts}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="fixed flex items-center border p-2 rounded-xl bottom-4 right-4 space-x-2">
          <FormNavBtn
            theme={designAtts.theme}
            onClick={() => paginate("prev")}
            disabled={currentSection === 0}
            className=" rounded-l-lg"
          >
            <ChevronLeft className="text-zinc-900" />
          </FormNavBtn>
          <FormNavBtn
            onClick={() => paginate("next")}
            theme={designAtts.theme}
            disabled={currentSection === elements.length - 1}
            className="rounded-r-lg"
          >
            <ChevronRight className="text-zinc-900" />
          </FormNavBtn>
          <h2 className="ml-1"> Powered by Formstore</h2>
        </div>
      </FormBackground>
    );
  else
    return (
      <div className="h-[100dvh] w-[100dvw] flex flex-col gap-10 items-center justify-center">
        <h2 className="text-7xl text-red-500 font-bold">
          Elements Not Found - 404{" "}
        </h2>

        <Button
          variant={"black"}
          className="w-50 h-15 text-2xl group"
          effect={"scale"}
          asChild
        >
          <Link to={`/workspace/${workspaceId}/${formId}/create`}>
            <ArrowLeft className="size-7 group-hover:-translate-x-5 duration-250 ease-linear" />
            Go back{" "}
          </Link>
        </Button>
      </div>
    );
};

export default FullPageScroll;

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
  goNextFunction,
  element,
  designAtts,
}: {
  goNextFunction: Function;
  element: FormElements;
  designAtts: FormDesignAttributes;
}) => {
  return (
    <FormCard theme={designAtts.theme} className="overflow-y-scroll">
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
      <section className=" min-h-[130px] flex justify-center font-['Roboto','sans-serif']">
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
