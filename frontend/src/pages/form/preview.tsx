import { $all_forms } from "@/store/forms/form-elements";
import { useStore } from "@nanostores/react";
import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router";

import { AnimatePresence, motion } from "motion/react";
const variants = {
  enter: (direction: "up" | "down") => ({
    y: direction === "up" ? -100 : 100,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: (direction: "up" | "down") => ({
    y: direction === "up" ? 100 : -100,
    opacity: 0,
    transition: { duration: 0.5 },
  }),
};

const FullPageScroll = () => {
  const { workspaceId, formId } = useParams();
  const allForms = useStore($all_forms);

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

  return (
    <div className="relative bg-red-800 overflow-hidden h-[100dvh]">
      {/* Progress Bar */}
      <div
        id="scroll-progress"
        className="fixed rounded-r-[4px] top-0 left-0 z-50 h-2.5 bg-blue-500 transition-all duration-500"
        style={{
          width: `${progressPercentage}%`,
        }}
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
              <div className="h-full rounded-none bg-amber-500 flex items-center justify-center">
                {currentElement.field}
              </div>
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
    </div>
  );
};

export default FullPageScroll;
