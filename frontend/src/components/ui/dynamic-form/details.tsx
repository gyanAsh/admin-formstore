import { cn } from "@/lib/utils";
import {
  FontSizeNumber,
  FormColor,
  FormFont,
} from "@/store/designs/design-elements.types";

export const FormLabel = ({
  theme,
  family,
  size = 1,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  family: FormFont;
  size: FontSizeNumber;
  theme: FormColor;
}) => {
  return (
    <div
      className={cn(
        "font-bold text-center whitespace-pre-line",
        { "text-zinc-200": theme == "noir" },
        { "text-zinc-900": theme == "sky" },

        { "font-['Cal_Sans','sans-serif']": family == "Cal_San" },

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
  family: FormFont;
  size: FontSizeNumber;
  theme: FormColor;
}) => {
  return (
    <div
      className={cn(
        " text-center whitespace-pre-line",
        { "text-zinc-300": theme == "noir" },
        { "text-zinc-900": theme == "sky" },

        { "font-['Cal_Sans','sans-serif']": family == "Cal_San" },

        { "text-5xl md:text-7xl": size === 7 },
        { "text-lg md:text-2xl": size === 3 },
        className
      )}
      {...props}
    />
  );
};
