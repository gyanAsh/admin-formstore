import { cn } from "@/lib/utils";
import { FormTheme } from "@/store/designs/design-elements.types";

export const FormCard = ({
  className,
  ...props
}: React.ComponentProps<"div"> & { theme: FormTheme }) => {
  return (
    <div
      className={cn(
        "p-6 h-full grid grid-cols-1 text-center",

        className
      )}
      {...props}
    />
  );
};
