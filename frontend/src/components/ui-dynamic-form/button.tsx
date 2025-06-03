import { cn } from "@/lib/utils";
import { FormTheme } from "@/store/designs/design-elements.types";
import { ThemeValues } from "@/store/designs/values";

export const FormButton = ({
  theme,
  variant = "default",
  className,
  ...props
}: React.ComponentProps<"button"> & {
  variant?: FormBtnVariants;
  theme: FormTheme;
}) => {
  return (
    <button
      className={cn(
        " min-w-25 w-[135px] md:w-[160px] capitalize",
        " px-2 md:px-3 py-2 md:py-3 cursor-pointer",
        "active:scale-95 duration-200 transition-colors",

        {
          "bg-white text-zinc-900 hover:text-white hover:bg-zinc-800":
            variant == "default",
        },

        {
          "  hover:bg-red-400 border-2 border-zinc-400 hover:border-zinc-900 hover:text-inherit text-zinc-100 ":
            variant == "destructive",
        },
        {
          "text-base md:text-lg rounded-4xl":
            theme === ThemeValues.luxe_minimal_noir.value,
        },
        {
          "text-base md:text-lg rounded-4xl ":
            theme === ThemeValues.gradient_forest.value,
        },
        {
          "text-emerald-600 hover:bg-emerald-600 hover:text-emerald-50 ":
            theme === ThemeValues.gradient_forest.value && variant == "default",
        },
        {
          "  hover:bg-red-200/85 border-2 border-zinc-50 hover:border-emerald-600 hover:text-emerald-600 text-zinc-50 ":
            theme === ThemeValues.gradient_forest.value &&
            variant == "destructive",
        },
        className
      )}
      {...props}
    />
  );
};

type FormBtnVariants = "default" | "destructive";
