import { cn } from "@/lib/utils";
import { FormColor, FormLayout } from "@/store/designs/design-elements.types";

export const FormCard = ({
  theme = "noir",
  layout = "center",
  className,
  ...props
}: React.ComponentProps<"div"> & { theme: FormColor; layout: FormLayout }) => {
  return (
    <div
      className={cn(
        "p-6 h-full grid",

        { "grid-cols-1 text-center": layout == "center" },
        { "grid-cols-2 text-left": layout == "left" || layout == "right" },

        { "bg-zinc-950": theme == "noir" },
        { "bg-blue-200": theme == "sky" },
        { "bg-violet-200/80": theme == "violet" },
        { "bg-green-200": theme == "forest" },
        className
      )}
      {...props}
    />
  );
};
