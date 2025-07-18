import { cn } from "@/lib/utils";
import { useFormV1Store } from "../state/design";
import {
  getFontWeigth,
  maxMdTextSize,
  maxSmTextSize,
  textSizeLineHeight,
} from "../types/design.types";

export const FormLabel = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const { label: design, layout: layoutDesign } = useFormV1Store(
    (state) => state.design
  );
  const style: Record<string, string | number> & React.CSSProperties = {
    "--size": design.size,
    "--md-size": maxMdTextSize[design.size],
    "--sm-size": maxSmTextSize[design.size],
    "--family": design.family,
    "--weight": design.weight,
    "--wght-weight": getFontWeigth[design.weight],
    "--text-color": design.color,
    "--italics": design.italics ? "italic" : "normal",
    "--letter-space": design.letter_spacing,
    "--text-align": layoutDesign.textAlign || "center",
  };

  return (
    <div
      className={cn(
        "whitespace-pre-line [text-align:var(--text-align)]",
        "text-[calc(var(--sm-size))] md:text-[calc(var(--md-size))] lg:text-[calc(var(--size))] [color:var(--text-color)]",
        "[line-height:var(--line-height)] [font-style:var(--italics)] [font-family:var(--family)] font-[var(--weight)] tracking-[var(--letter-space)]",
        "[font-variation-settings:_'wght'_var(--wght-weight)]",

        { " max-w-150 w-full ": layoutDesign.spread === true },
        className
      )}
      style={style}
      {...props}
    />
  );
};

export const FormDescription = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const { description: design, layout: layoutDesign } = useFormV1Store(
    (state) => state.design
  );
  const style: Record<string, string | number> & React.CSSProperties = {
    "--size": design.size,
    "--md-size": maxMdTextSize[design.size],
    "--sm-size": maxSmTextSize[design.size],
    "--line-height": textSizeLineHeight[design.size],
    "--family": design.family,
    "--weight": design.weight,
    "--wght-weight": getFontWeigth[design.weight],
    "--text-color": design.color,
    "--italics": design.italics ? "italic" : "normal",
    "--letter-space": design.letter_spacing,
    "--text-align": layoutDesign.textAlign || "center",
  };

  return (
    <div
      className={cn(
        "whitespace-pre-line [text-align:var(--text-align)]",
        " text-[calc(var(--sm-size))] md:text-[calc(var(--md-size))] lg:text-[calc(var(--size))] [color:var(--text-color)]",
        "[line-height:var(--line-height)] [font-style:var(--italics)] [font-family:var(--family)] font-[var(--weight)] tracking-[var(--letter-space)]",
        "[font-variation-settings:_'wght'_var(--wght-weight)]",

        { " max-w-150 w-full ": layoutDesign.spread === true },
        className
      )}
      style={style}
      {...props}
    />
  );
};

export const DetailsContainer = ({
  children,
}: React.ComponentProps<"section">) => {
  const { layout: layoutDesign } = useFormV1Store((state) => state.design);

  return (
    <section
      className={cn(
        "flex flex-col justify-center px-2 md:px-8 lg:px-16 gap-2.5 md:gap-5.5 scale-90 @[64rem]:scale-100",
        { " items-center ": layoutDesign.spread === true }
      )}
    >
      {children}
    </section>
  );
};
