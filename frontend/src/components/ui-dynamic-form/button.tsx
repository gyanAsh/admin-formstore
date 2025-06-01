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
        " min-w-25 px-2 md:px-3 py-2 md:py-3 cursor-pointer",
        "active:scale-95 duration-75",
        { "text-base md:text-lg": "size" === "size" },
        { "bg-white text-zinc-900": variant == "default" },

        {
          "bg-green-300 border-2 border-emerald-500 hover:bg-green-400 hover:text-zinc-100":
            theme == "forest",
        },
        {
          "bg-inherit border-2 border-gray-800 hover:bg-zinc-800 hover:text-zinc-50":
            false,
        },
        className
      )}
      {...props}
    />
  );
};

type FormBtnVariants = "default";
