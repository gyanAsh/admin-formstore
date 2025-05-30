import { cn } from "@/lib/utils";
import { FormColor } from "@/store/designs/design-elements.types";

export const FormBackground = ({
  theme = "noir",
  className,
  ...props
}: React.ComponentProps<"div"> & { theme: FormColor }) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden h-[100dvh]",
        { "bg-black text-white": theme == "noir" },
        { "bg-black text-black": theme == "sky" },
        { "bg-violet-300 text-black": theme == "violet" },
        { "bg-green-200 text-black": theme == "forest" },
        {
          "shadow-[inset_14px_24px_16px_-21px_rgba(209,217,230,0.34),inset_14px_28px_20px_-21px_rgba(209,217,230,0.4),inset_14px_35px_27px_-21px_rgba(209,217,230,0.48),inset_14px_54px_43px_-21px_rgba(209,217,230,0.67),inset_21px_-50px_100px_26px_rgba(255,255,255,0.76),inset_-36px_-36.8341px_24.6719px_-21px_rgba(255,255,255,0.54),inset_-36px_-31.3638px_17.026px_-21px_rgba(255,255,255,0.45),inset_-36px_-28.4185px_16px_-21px_rgba(255,255,255,0.38)]":
            ["trance_sky"].some((e) => e === theme),
        },
        {
          "bg-gradient-to-t from-purple-300 via-blue-300 to-purple-300 text-zinc-900":
            theme === "trance_sky",
        },
        className
      )}
      {...props}
    />
  );
};
