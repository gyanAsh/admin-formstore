import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useFormV1Store } from "../state/design";

export default function AnimatedCheckbox({
  className,
  checked,
  ...props
}: React.ComponentProps<"div"> & { checked: boolean }) {
  const { element: elDesign } = useFormV1Store((state) => state.design);

  const elStyle: Record<string, string> & React.CSSProperties = {
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
    <div
      className={cn(
        "w-fit relative",
        " px-2.5 md:px-3 py-2.5 md:py-3 cursor-pointer size-12 aspect-square flex items-center justify-center",
        " hover:contrast-75 active:scale-95 duration-200 transition-colors",
        "rounded text-[var(--text-color)] [font-family:var(--input-family)] text-lg bg-[var(--bg-color)]/[var(--transparant)] border-2 border-[var(--border-color)] hover:text-[var(--text-color)] hover:bg-[var(--bg-color)]/[var(--transparant)]",
        { " backdrop-blur-[1px]": elDesign.variant === "glass" },
        className
      )}
      style={elStyle}
      {...props}
    >
      {checked && <Check strokeWidth={3} className="absolute w-full" />}
    </div>
  );
}
