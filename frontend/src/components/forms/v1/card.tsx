import { cn } from "@/lib/utils";
import { $get_design_layout } from "@/store/forms/form-elements";
import { useStore } from "@nanostores/react";

export const FormCard = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const design = useStore($get_design_layout);
  const style: Record<string, string> & React.CSSProperties = {
    "--space-gap": design.elementSpacing,
  };
  return (
    <div
      className={cn(
        "p-6 h-full grid grid-cols-1 gap-[calc(var(--space-gap)_*_4)]",
        className
      )}
      style={style}
      {...props}
    />
  );
};

export const InputContainer = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "scale-90 @[64rem]:scale-100 flex justify-center",
        "  px-2 md:px-8 lg:px-16 gap-2.5 md:gap-5.5 ",
        className
      )}
      {...props}
    />
  );
};
