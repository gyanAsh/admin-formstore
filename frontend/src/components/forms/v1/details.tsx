import { cn } from "@/lib/utils";
import {
  $get_design_description,
  $get_design_label,
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
  const style: Record<string, string> & React.CSSProperties = {
    "--size": design.size,
    "--md-size": maxMdTextSize[design.size],
    "--sm-size": maxSmTextSize[design.size],
    "--family": design.family,
    "--weight": design.weight,
    "--text-color": design.color,
    "--italics": design.italics ? "italic" : "normal",
    "--letter-space": design.letter_spacing,
  };

  return (
    <div
      className={cn(
        "whitespace-pre-line ",
        "text-[calc(var(--sm-size))] md:text-[calc(var(--md-size))] lg:text-[calc(var(--size))] [color:var(--text-color)]",
        "[line-height:var(--line-height)] [font-style:var(--italics)] [font-family:var(--family)] font-[var(--weight)] tracking-[var(--letter-space)]",
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
  };

  return (
    <div
      className={cn(
        "whitespace-pre-line ",
        " text-[calc(var(--sm-size))] md:text-[calc(var(--md-size))] lg:text-[calc(var(--size))] [color:var(--text-color)]",
        "[line-height:var(--line-height)] [font-style:var(--italics)] [font-family:var(--family)] font-[var(--weight)] tracking-[var(--letter-space)]",

        className
      )}
      style={style}
      {...props}
    />
  );
};
