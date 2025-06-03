import { cn } from "@/lib/utils";
import { FormTheme } from "@/store/designs/design-elements.types";
import { ThemeValues } from "@/store/designs/values";

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
        "text-center whitespace-pre-line text-5xl md:text-7xl",
        {
          "text-zinc-200 font-['Playfair_Display','serif'] font-semibold":
            theme == ThemeValues.luxe_minimal_noir.value,
        },
        {
          "text-zinc-900 font-['Playfair_Display','serif'] font-semibold":
            theme == "luxe_minimal_sky",
        },
        {
          " text-zinc-200 font-['Lora','serif'] ": theme == "violet",
        },
        {
          "text-emerald-50 font-['Roboto','serif'] font-light":
            theme == ThemeValues.gradient_forest.value,
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
        " text-center whitespace-pre-line text-lg md:text-2xl",
        {
          "text-zinc-300 font-['Roboto','sans-serif'] text-lg md:text-xl":
            theme == ThemeValues.luxe_minimal_noir.value,
        },
        {
          "text-zinc-900 font-['Roboto','sans-serif']":
            theme == "luxe_minimal_sky",
        },
        { "text-zinc-800 font-['Roboto','sans-serif']": theme == "violet" },
        {
          "text-emerald-50 font-['Roboto','sans-serif'] font-light":
            theme == ThemeValues.gradient_forest.value,
        },

        className
      )}
      {...props}
    />
  );
};
