import { cn } from "@/lib/utils";
import { useFormV1Store } from "../state/design";

export const FormProgressBar = ({
  progressPercentage,
}: {
  progressPercentage: number;
}) => {
  const { element: elDesign } = useFormV1Store((state) => state.design);

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
