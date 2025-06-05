import { cn } from "@/lib/utils";
import { FormTheme } from "@/store/forms/designs/design-elements.types";
import { ThemeValues } from "@/store/forms/designs/values";

export const FormLabel = ({
  theme,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  theme: FormTheme;
}) => {
  return (
    <div
      className={cn(
        "text-center whitespace-pre-line text-5xl @[64rem]:text-7xl",
        {
          "text-zinc-200 font-['Playfair_Display','serif'] font-semibold":
            theme == ThemeValues.luxe_minimal_noir.value,
        },
        {
          "text-emerald-50 font-['Roboto','serif'] font-medium":
            theme == ThemeValues.gradient_forest.value,
        },
        {
          "font-['Playfair_Display','serif'] font-light italic":
            theme == ThemeValues.luxe_minimal_forest.value,
        },

        // { "font-['Cal_Sans','sans-serif']": family == "Cal_San" },

        // { "font-['IBM_Plex_Serif','serif']": family == "IBM_Plex_Serif" },
        // { "font-['Roboto','sans-serif']": family == "Roboto" },

        className
      )}
      {...props}
    />
  );
};

export const FormDescription = ({
  theme,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  theme: FormTheme;
}) => {
  return (
    <div
      className={cn(
        " text-center whitespace-pre-line text-lg @[64rem]:text-2xl",
        {
          "text-zinc-300 font-['Roboto','sans-serif'] text-lg @[64rem]:text-xl":
            theme == ThemeValues.luxe_minimal_noir.value,
        },
        {
          "text-emerald-50 font-['Roboto','sans-serif'] font-light":
            theme == ThemeValues.gradient_forest.value,
        },
        {
          "font-['Playfair_Display','serif'] font-light italic":
            theme == ThemeValues.luxe_minimal_forest.value,
        },

        className
      )}
      {...props}
    />
  );
};
