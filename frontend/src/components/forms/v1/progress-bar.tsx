import { cn } from "@/lib/utils";
import { FormTheme } from "@/store/forms/designs/design-elements.types";
import { ThemeValues } from "@/store/forms/designs/values";

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
        { "bg-emerald-200": theme == ThemeValues.gradient_forest.value },
        { "bg-green-600": theme === ThemeValues.luxe_minimal_forest.value }
      )}
      style={{
        width: `${progressPercentage}%`,
      }}
    />
  );
};
