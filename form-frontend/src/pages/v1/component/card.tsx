import { cn } from "@/lib/utils";
import { useFormV1Store } from "../state/design";

export const FormCard = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const { layout: design } = useFormV1Store((state) => state.design);
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
  const { description: desDesign } = useFormV1Store((state) => state.design);
  const style: Record<string, string> & React.CSSProperties = {
    "--input-family": desDesign.family,
  };

  return (
    <div
      className={cn(
        "scale-90 @[64rem]:scale-100 flex justify-center",
        "  px-2 md:px-8 lg:px-16 gap-2.5 md:gap-5.5 ",
        className
      )}
      style={style}
      {...props}
    />
  );
};
