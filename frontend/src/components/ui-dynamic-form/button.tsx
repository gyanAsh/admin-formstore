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
          "text-base md:text-lg rounded-4xl":
            theme === ThemeValues.luxe_minimal_noir.value,
        },
        {
          "bg-white text-zinc-900 hover:text-white hover:bg-zinc-800":
            variant == "default",
        },

        {
          "  hover:bg-red-400 border-2 border-zinc-400 hover:border-zinc-900 hover:text-inherit text-zinc-100 ":
            variant == "destructive",
        },
        className
      )}
      {...props}
    />
  );
};

type FormBtnVariants = "default" | "destructive";
