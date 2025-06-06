import { cn } from "@/lib/utils";
import { FormTheme } from "@/store/forms/designs/design-elements.types";
import { ThemeValues } from "@/store/forms/designs/values";

export const FormBackground = ({
  theme = ThemeValues.luxe_minimal_noir.value,
  className,
  ...props
}: React.ComponentProps<"div"> & { theme: FormTheme }) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden h-full cursor-default",
        {
          "bg-zinc-950 text-white":
            theme == ThemeValues.luxe_minimal_noir.value,
        },
        {
          "text-zinc-50 [background:radial-gradient(at_75%_49%,_#00a388_0px,_transparent_50%),_radial-gradient(at_4%_66%,_#79bd8f_0px,_transparent_50%),_radial-gradient(at_14%_1%,_#beeb9f_0px,_transparent_50%),_radial-gradient(at_53%_55%,_#ffff9d_0px,_transparent_50%),_#00a388]":
            theme == ThemeValues.gradient_forest.value,
        },
        {
          " text-green-600 bg-yellow-50":
            theme == ThemeValues.luxe_minimal_forest.value,
        },

        className
      )}
      {...props}
    />
  );
};
