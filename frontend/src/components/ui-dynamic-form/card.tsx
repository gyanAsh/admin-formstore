import { cn } from "@/lib/utils";
import { FormTheme } from "@/store/designs/design-elements.types";

export const FormCard = ({
  theme = "luxe_minimal_noir",
  className,
  ...props
}: React.ComponentProps<"div"> & { theme: FormTheme }) => {
  return (
    <div
      className={cn(
        "p-6 h-full grid grid-cols-1 text-center",

        { "bg-zinc-950": theme == "luxe_minimal_noir" },
        // { "bg-blue-200/75": theme == "luxe_minimal_sky" },
        // { "bg-violet-200 contrast-125": theme == "violet" },
        // { "bg-green-200 contrast-125": theme == "forest" },
        className
      )}
      {...props}
    />
  );
};
