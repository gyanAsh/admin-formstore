import { cn } from "@/lib/utils";
import { $current_form } from "@/store/forms/form-elements";
import { useStore } from "@nanostores/react";

export const FormCard = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const currentForm = useStore($current_form);
  const showTwoCol = currentForm.design.displayTwoColumns;
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
