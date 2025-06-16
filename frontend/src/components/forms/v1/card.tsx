import { cn } from "@/lib/utils";

export const FormCard = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("p-6 h-full grid grid-cols-1 text-center", className)}
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
