import { cn } from "@/lib/utils";
import { FormTheme } from "@/store/designs/design-elements.types";
import { ThemeValues } from "@/store/designs/values";

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
        "absolute top-0 left-0 h-2.5 transition-all ease-linear duration-600",
        { "bg-zinc-50": theme == ThemeValues.luxe_minimal_noir.value },
        { "bg-black": theme == "luxe_minimal_sky" },
        { "bg-violet-300": theme == "violet" },
        { "bg-emerald-200": theme == ThemeValues.gradient_forest.value },

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
