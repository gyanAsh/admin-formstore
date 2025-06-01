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
          className={cn("flex items-center gap-1.5 px-2 md:px-3 py-2", {
            "border-2 border-red-500 text-red-500 ": type === "error",
            "bg-yellow-100 border-2 border-yellow-500 text-yellow-700":
              type === "warn",
          })}
        >
          {type === "error" && <TriangleAlert />}
          {type === "warn" && <CircleAlert />}
          {msg}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
