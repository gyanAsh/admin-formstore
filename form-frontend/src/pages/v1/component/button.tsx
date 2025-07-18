import { cn } from "@/lib/utils";
import { useFormV1Store } from "../state/design";

export const FormButton = ({
  className,
  ...props
}: React.ComponentProps<"button">) => {
  const { element: elDesign, button: btnDesign } = useFormV1Store(
    (state) => state.design
  );

  const buttonDesign = btnDesign || elDesign;
  const elStyle: Record<string, string> & React.CSSProperties = {
    "--text-color": buttonDesign.textColor,
    "--bg-color": buttonDesign.bgColor,
    "--border-color": buttonDesign.borderColor,
    "--transparant":
      buttonDesign.variant === "glass"
        ? "20%"
        : buttonDesign.variant === "outline"
        ? "0%"
        : "100%",
  };
  return (
    <button
      className={cn(
        " min-w-25  md:min-w-[160px] w-fit",
        " px-2.5 md:px-3 py-2.5 md:py-3 cursor-pointer",
        " hover:contrast-75 hover:scale-[1.02] active:scale-95 duration-200 transition-colors",

        "rounded-full text-[var(--text-color)] [font-family:var(--input-family)] text-lg bg-[var(--bg-color)]/[var(--transparant)] border-2 border-[var(--border-color)] hover:text-[var(--text-color)] hover:bg-[var(--bg-color)]/[var(--transparant)]",
        { " backdrop-blur-[1px]": elDesign.variant === "glass" },
        className
      )}
      style={elStyle}
      {...props}
    />
  );
};
