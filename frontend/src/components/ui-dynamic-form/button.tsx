import { cn } from "@/lib/utils";
import { FormColor } from "@/store/designs/design-elements.types";

export const FormButton = ({
  theme,
  variant = "default",
  className,
  ...props
}: React.ComponentProps<"button"> & {
  variant?: FormBtnVariants;
  theme: FormColor;
}) => {
  return (
    <button
      className={cn(
        " min-w-25 w-[135px] md:w-[160px] capitalize",
        " px-2 md:px-3 py-2 md:py-3 cursor-pointer",
        "active:scale-95 duration-200 transition-colors",
        { "text-base md:text-lg": "size" === "size" },
        {
          "bg-white text-zinc-900 hover:text-white hover:bg-zinc-800":
            variant == "default",
        },

        {
          "  hover:bg-red-300 bg-red-400 border-red-600 hover:text-inherit text-zinc-100 ":
            variant == "destructive",
        },
        className
      )}
      {...props}
    />
  );
};

type FormBtnVariants = "default" | "destructive";
