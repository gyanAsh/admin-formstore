import { cn } from "@/lib/utils";
import { $get_design_element } from "@/store/forms/form-elements";
import { useStore } from "@nanostores/react";

export const FormProgressBar = ({
  progressPercentage,
}: {
  progressPercentage: number;
}) => {
  const elDesign = useStore($get_design_element);

  const elStyle: Record<string, string> & React.CSSProperties = {
    "--border-color": elDesign.borderColor,
  };

  return (
    <div
      id="scroll-progress"
      className={cn(
        "absolute top-0 left-0 h-2.5 transition-all ease-linear duration-600 bg-[var(--border-color)] z-1"
      )}
      style={{
        width: `${progressPercentage}%`,
        ...elStyle,
      }}
    />
  );
};
