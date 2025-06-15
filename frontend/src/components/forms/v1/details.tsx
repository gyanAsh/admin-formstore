import { cn } from "@/lib/utils";
import { ThemeValues } from "@/store/forms/designs/values";
import { $current_form, $get_design_label } from "@/store/forms/form-elements";
import { maxMdTextSize, maxSmTextSize } from "@/store/forms/formV1Design";
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
  const currentForm = useStore($current_form);
  const theme = currentForm.design.theme;
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
