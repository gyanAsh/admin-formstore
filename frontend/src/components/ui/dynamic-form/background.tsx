import { cn } from "@/lib/utils";
import { FormColor } from "@/store/designs/design-elements.types";

export const FormBackground = ({
  theme = "noir",
  className,
  ...props
}: React.ComponentProps<"div"> & { theme: FormColor }) => {
  return (
    <div
      className={cn(
        "p-4 h-full",
        { "bg-black text-white": theme == "noir" },
        { "bg-sky-200 text-black": theme == "sky" },
        className
      )}
      {...props}
    />
  );
};
