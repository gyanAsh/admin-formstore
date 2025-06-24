import { cn } from "@/lib/utils";
import {
  $get_design_description,
  $get_design_label,
  $get_design_layout,
} from "@/store/forms/form-elements";
import {
  maxMdTextSize,
  maxSmTextSize,
  textSizeLineHeight,
} from "@/store/forms/formV1Design";
import { useStore } from "@nanostores/react";

export const FormLabel = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const design = useStore($get_design_label);
  const layoutDesign = useStore($get_design_layout);

  const style: Record<string, string> & React.CSSProperties = {
    "--size": design.size,
    "--md-size": maxMdTextSize[design.size],
    "--sm-size": maxSmTextSize[design.size],
    "--family": design.family,
    "--weight": design.weight,
    "--text-color": design.color,
    "--italics": design.italics ? "italic" : "normal",
    "--letter-space": design.letter_spacing,
    "--text-align": layoutDesign.textAlign,
  };

  return (
    <div
      className={cn(
        "whitespace-pre-line text-center ",
        " [text-align:var(--text-align)]",
        "text-[calc(var(--sm-size))] md:text-[calc(var(--md-size))] lg:text-[calc(var(--size))] [color:var(--text-color)]",
        "[line-height:var(--line-height)] [font-style:var(--italics)] [font-family:var(--family)] font-[var(--weight)] tracking-[var(--letter-space)]",
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
  const design = useStore($get_design_description);
  const layoutDesign = useStore($get_design_layout);
  const style: Record<string, string> & React.CSSProperties = {
    "--size": design.size,
    "--md-size": maxMdTextSize[design.size],
    "--sm-size": maxSmTextSize[design.size],
    "--line-height": textSizeLineHeight[design.size],
    "--family": design.family,
    "--weight": design.weight,
    "--text-color": design.color,
    "--italics": design.italics ? "italic" : "normal",
    "--letter-space": design.letter_spacing,
    "--text-align": layoutDesign.textAlign,
  };

  return (
    <div
      className={cn(
        "whitespace-pre-line text-center ",
        " [text-align:var(--text-align)]",
        " text-[calc(var(--sm-size))] md:text-[calc(var(--md-size))] lg:text-[calc(var(--size))] [color:var(--text-color)]",
        "[line-height:var(--line-height)] [font-style:var(--italics)] [font-family:var(--family)] font-[var(--weight)] tracking-[var(--letter-space)]",
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
  const layoutDesign = useStore($get_design_layout);

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
