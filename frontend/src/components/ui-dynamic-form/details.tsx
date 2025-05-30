import { cn } from "@/lib/utils";
import {
  FontSizeNumber,
  FormColor,
  FormFontFamily,
} from "@/store/designs/design-elements.types";

export const FormLabel = ({
  theme,
  family,
  size = 1,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  family: FormFontFamily;
  size: FontSizeNumber;
  theme: FormColor;
}) => {
  return (
    <div
      className={cn(
        "text-center whitespace-pre-line",
        { "text-zinc-200": theme == "noir" },
        { "text-zinc-900": theme == "sky" },
        { "text-zinc-800": theme == "violet" },
        { "text-zinc-900": theme == "forest" },

        { "font-['Cal_Sans','sans-serif']": family == "Cal_San" },
        {
          "font-['Playfair_Display','serif'] font-semibold":
            family == "Playfair_Display",
        },
        { "font-['IBM_Plex_Serif','serif']": family == "IBM_Plex_Serif" },
        { "font-['Roboto','sans-serif']": family == "Roboto" },

        { "text-5xl md:text-7xl": size === 7 },
        { "text-lg md:text-2xl": size === 3 },
        className
      )}
      {...props}
    />
  );
};

export const FormDescription = ({
  theme,
  family,
  size = 1,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  family: FormFontFamily;
  size: FontSizeNumber;
  theme: FormColor;
}) => {
  return (
    <div
      className={cn(
        " text-center whitespace-pre-line",
        { "text-zinc-300": theme == "noir" },
        { "text-zinc-900": theme == "sky" },
        { "text-zinc-800": theme == "violet" },

        { "font-['Cal_Sans','sans-serif']": family == "Cal_San" },
        { "font-['Playfair_Display','serif']": family == "Playfair_Display" },
        { "font-['IBM_Plex_Serif','serif']": family == "IBM_Plex_Serif" },
        { "font-['Roboto','sans-serif']": family == "Roboto" },

        { "text-5xl md:text-7xl": size === 7 },
        { "text-lg md:text-2xl": size === 3 },
        className
      )}
      {...props}
    />
  );
};
