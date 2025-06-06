import { cn } from "@/lib/utils";
import { CircleAlert, TriangleAlert } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

export const FormErrorMsgPopUp = ({
  show,
  msg,
  type,
}: {
  show: boolean;
  msg: string;
  type: "warn" | "error";
}) => {
  const variants = {
    enter: {
      y: -10,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      y: 10,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={type}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className={cn(
            "flex items-center gap-1.5 px-2 md:px-3 py-2",
            "bg-clip-padding backdrop-filter backdrop-blur backdrop-saturate-100 backdrop-contrast-100",
            {
              "bg-red-500 border-2 border-red-300 text-red-50 ":
                type === "error",
              " bg-yellow-500 border-2 border-yellow-300 text-yellow-50":
                type === "warn",
            }
          )}
        >
          {type === "error" && <TriangleAlert />}
          {type === "warn" && <CircleAlert />}
          {msg}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
