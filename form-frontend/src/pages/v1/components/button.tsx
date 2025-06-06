import { cn } from "@/lib/utils";
import { FormTheme } from "@/store/forms/designs/design-elements.types";
import { ThemeValues } from "@/store/forms/designs/values";

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
        " min-w-25 w-[135px] md:w-[160px]",
        " px-2 md:px-3 py-2 md:py-3 cursor-pointer",
        "active:scale-95 duration-200 transition-colors",

        {
          "bg-white text-zinc-900 hover:text-white hover:border-zinc-100 border-2 border-transparent hover:bg-zinc-800":
            variant == "default",
        },

        {
          "  hover:bg-gray-400 border-2 border-zinc-400 hover:border-zinc-900 hover:text-inherit text-zinc-100 ":
            variant == "secondary",
        },
        {
          "text-base md:text-lg rounded-4xl":
            theme === ThemeValues.luxe_minimal_noir.value,
        },
        //gradient-forest
        {
          "text-base md:text-lg rounded-4xl ":
            theme === ThemeValues.gradient_forest.value,
        },
        {
          "text-emerald-600 hover:bg-emerald-600 hover:text-emerald-50 ":
            theme === ThemeValues.gradient_forest.value && variant == "default",
        },
        {
          "hover:bg-gray-200/85 border-2 border-zinc-50 hover:border-emerald-600 hover:text-emerald-600 text-zinc-50 ":
            theme === ThemeValues.gradient_forest.value &&
            variant == "secondary",
        },
        //luxe-minimal-forest
        {
          "text-base md:text-lg rounded-4xl":
            theme === ThemeValues.luxe_minimal_forest.value,
        },
        {
          "text-green-50 bg-green-600 hover:bg-green-200 hover:border-green-700 border-2 border-transparent hover:text-green-700 ":
            theme === ThemeValues.luxe_minimal_forest.value &&
            variant == "default",
        },
        {
          "hover:bg-gray-100 border-2 hover:border-green-50 border-emerald-600 hover:text-emerald-600 text-green-600 ":
            theme === ThemeValues.luxe_minimal_forest.value &&
            variant == "secondary",
        },
        className
      )}
      {...props}
    />
  );
};

type FormBtnVariants = "default" | "secondary";
