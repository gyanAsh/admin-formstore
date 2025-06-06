import { cn } from "@/lib/utils";
import { FormTheme } from "@/store/forms/designs/design-elements.types";

export const FormCard = ({
  showTwoCol,
  className,
  ...props
}: React.ComponentProps<"div"> & { theme: FormTheme; showTwoCol: boolean }) => {
  return (
    <div
      className={cn(
        "p-6 h-full grid grid-cols-1 text-center",
        { " lg:grid-cols-2 lg:items-center": showTwoCol },

        className
      )}
      {...props}
    />
  );
};
