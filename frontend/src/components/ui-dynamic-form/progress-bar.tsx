import { cn } from "@/lib/utils";
import { FormTheme } from "@/store/designs/design-elements.types";

export const FormProgressBar = ({
  progressPercentage,
  theme,
}: {
  progressPercentage: number;
  theme: FormTheme;
}) => {
  return (
    <div
      id="scroll-progress"
      className={cn(
        "fixed top-0 left-0 z-50 h-2.5 transition-all ease-linear duration-600",
        { "bg-zinc-50": theme == "luxe_minimal_noir" },
        { "bg-black": theme == "luxe_minimal_sky" },
        { "bg-violet-300": theme == "violet" },
        { "bg-green-400/85": theme == "forest" },

        {
          "bg-gradient-to-r from-purple-400 to-blue-400":
            theme === "trance_sky",
        }
      )}
      style={{
        width: `${progressPercentage}%`,
      }}
    />
  );
};
