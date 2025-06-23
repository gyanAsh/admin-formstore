import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router";

import { AnimatePresence, motion } from "motion/react";
// import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";

import { cn } from "@/lib/utils";
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
  ConsentValidation,
  EmailValidation,
  FormElements,
  Forms,
  RatingValidation,
  TextValidation,
  UrlValidation,
} from "./types/elements.types";
import { FormBackground } from "./component/background";
import { useFormV1Store } from "./state/design";
import { useQuery } from "@tanstack/react-query";
import { fetchForm } from "./endpoint";

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

  const progressPercentage = useMemo(() => {
    if (elements.length === 0) return 0;
    return ((currentSection + 1) / elements.length) * 100;
  }, [currentSection, elements.length]);

  const currentElement = elements[currentSection];
  if (isLoading) return <div>Loading...</div>;
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
          <div className="text-sm absolute flex items-center border-zinc-200 bg-black text-white p-2 rounded-3xl bottom-4 right-4 space-x-2">
            <div className={cn("flex items-center space-x-0.5")}>
              <FormNavBtn
                onClick={() => paginate("prev")}
                disabled={currentSection === 0}
                className="p-0.5 rounded-l-lg"
              >
                <ChevronLeft className="size-5.5 text-zinc-900" />
              </FormNavBtn>
              <FormNavBtn
                onClick={() => paginate("next")}
                disabled={currentSection === elements.length - 1}
                className="p-0.5 rounded-r-lg"
              >
                <ChevronRight className="size-5.5 text-zinc-900" />
              </FormNavBtn>
            </div>

            <h2 className="ml-0.5 text-base">
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
}: {
  formCardClassName?: React.ComponentProps<"div">["className"];
  goNextFunction: Function;
  element: FormElements;
}) => {
  return (
    <FormCard className={cn("overflow-y-scroll @container", formCardClassName)}>
      <DetailsContainer>
        <FormLabel>{element.label}</FormLabel>
        <FormDescription>{element.description}</FormDescription>
      </DetailsContainer>

      <InputContainer>
        {element.type === "email" ? (
          <FormEmail
            email={element.properties as EmailValidation}
            goNextFunction={goNextFunction}
          />
        ) : element.type === "consent" ? (
          <FormConsent
            consent={element.properties as ConsentValidation}
            goNextFunction={goNextFunction}
          />
        ) : element.type === "rating" ? (
          <FormRating
            rating={element.properties as RatingValidation}
            goNextFunction={goNextFunction}
          />
        ) : element.type === "text" ? (
          <FormText
            text={element.properties as TextValidation}
            goNextFunction={goNextFunction}
          />
        ) : element.type === "website" ? (
          <FormWebsite
            url={element.properties as UrlValidation}
            goNextFunction={goNextFunction}
          />
        ) : (
          <p>{element.type}</p>
        )}
      </InputContainer>
    </FormCard>
  );
};
