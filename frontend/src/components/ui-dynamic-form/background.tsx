import { cn } from "@/lib/utils";
import { FormTheme } from "@/store/designs/design-elements.types";
import { ThemeValues } from "@/store/designs/values";

export const FormBackground = ({
  theme = ThemeValues.luxe_minimal_noir.value,
  className,
  ...props
}: React.ComponentProps<"div"> & { theme: FormTheme }) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden h-full cursor-default",
        {
          "bg-zinc-950 text-white":
            theme == ThemeValues.luxe_minimal_noir.value,
        },
        { "bg-blue-200 text-black": theme == "luxe_minimal_sky" },
        { "bg-violet-200 text-black": theme == "violet" },
        {
          "text-zinc-50 [background:radial-gradient(at_75%_49%,_#00a388_0px,_transparent_50%),_radial-gradient(at_4%_66%,_#79bd8f_0px,_transparent_50%),_radial-gradient(at_14%_1%,_#beeb9f_0px,_transparent_50%),_radial-gradient(at_53%_55%,_#ffff9d_0px,_transparent_50%),_#00a388]":
            theme == ThemeValues.gradient_forest.value,
        },
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
