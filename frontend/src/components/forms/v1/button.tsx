import { cn } from "@/lib/utils";
import {
  $get_design_element,
  $get_design_label,
} from "@/store/forms/form-elements";
import { useStore } from "@nanostores/react";

export const FormButton = ({
  className,
  ...props
}: React.ComponentProps<"button">) => {
  const elDesign = useStore($get_design_element);
  const design = useStore($get_design_label);

  const elStyle: Record<string, string> & React.CSSProperties = {
    "--family": design.family,
    "--text-color": elDesign.textColor,
    "--bg-color": elDesign.bgColor,
    "--border-color": elDesign.borderColor,
    "--transparant":
      elDesign.variant === "glass"
        ? "20%"
        : elDesign.variant === "outline"
        ? "0%"
        : "100%",
  };
  return (
    <button
      className={cn(
        " min-w-25 w-[135px] md:w-[160px]",
        " px-2 md:px-3 py-2 md:py-3 cursor-pointer",
        "active:scale-95 duration-200 transition-colors",

        "rounded-full text-[var(--text-color)] [font-family:var(--family)] text-lg px-7 py-5 bg-[var(--bg-color)]/[var(--transparant)] border-2 border-[var(--border-color)] hover:text-[var(--text-color)] hover:bg-[var(--bg-color)]/[var(--transparant)]",
        { " backdrop-blur-[1px]": elDesign.variant === "glass" },
        className
      )}
      style={elStyle}
      {...props}
    />
  );
};
