import { $all_forms } from "@/store/forms/form-elements";
import { useStore } from "@nanostores/react";
import { useCallback, useMemo, useState } from "react";
import { Link, useParams } from "react-router";

import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  ConsentValidation,
  EmailValidation,
  FormElements,
} from "@/store/forms/form-elemets.types";
import { $form_design_atts } from "@/store/designs/design-elements";
import { FormBackground } from "@/components/ui-dynamic-form/background";
import { FormCard } from "@/components/ui-dynamic-form/card";
import {
  FormDescription,
  FormLabel,
} from "@/components/ui-dynamic-form/details";
import { cn } from "@/lib/utils";
import { FormDesignAttributes } from "@/store/designs/design-elements.types";
import { FormProgressBar } from "@/components/ui-dynamic-form/progress-bar";
import { FormEmail } from "@/components/ui-dynamic-form/elements/email";
import { FormConsent } from "@/components/ui-dynamic-form/elements/consent";
const variants = {
  enter: (direction: "up" | "down") => ({
    y: direction === "up" ? -100 : 100,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: (direction: "up" | "down") => ({
    y: direction === "up" ? 100 : -100,
    opacity: 0,
    transition: { duration: 0.3 },
  }),
};

const FullPageScroll = () => {
  const { workspaceId, formId } = useParams();
  const allForms = useStore($all_forms);
  const designAtts = useStore($form_design_atts);

  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down");

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
    (newDirection: "up" | "down") => {
      setDirection(newDirection);
      setCurrentSection((prev) =>
        newDirection === "down"
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
      <FormBackground theme={designAtts.color}>
        {/* Progress Bar */}
        <FormProgressBar
          progressPercentage={progressPercentage}
          theme={designAtts.color}
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
                  goNextFunction={() => paginate("down")}
                  element={currentElement}
                  designAtts={designAtts}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="fixed bottom-4 left-4 space-x-2">
          <button
            onClick={() => paginate("up")}
            disabled={currentSection === 0}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => paginate("down")}
            disabled={currentSection === elements.length - 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
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
    <FormCard
      theme={designAtts.color}
      layout={designAtts.layout}
      className="overflow-y-scroll"
    >
      <section
        className={cn(
          "flex flex-col justify-center  px-2 md:px-8 lg:px-16 gap-2.5 md:gap-5.5 "
        )}
      >
        <FormLabel
          theme={designAtts.color}
          family={designAtts.label.font}
          size={designAtts.label.size}
        >
          {element.labels.title}
        </FormLabel>
        <FormDescription
          theme={designAtts.color}
          className=""
          family={designAtts.description.font}
          size={designAtts.description.size}
        >
          {element.labels.description}
        </FormDescription>
      </section>
      <section className=" min-h-[130px] flex justify-center ">
        {element.field === "email" ? (
          <FormEmail
            family={designAtts.description.font}
            email={element.validations as EmailValidation}
            theme={designAtts.color}
            goNextFunction={goNextFunction}
          />
        ) : element.field === "consent" ? (
          <FormConsent
            family={designAtts.description.font}
            consent={element.validations as ConsentValidation}
            theme={designAtts.color}
            goNextFunction={goNextFunction}
          />
        ) : (
          <p>{element.field}</p>
        )}
      </section>
    </FormCard>
  );
};
