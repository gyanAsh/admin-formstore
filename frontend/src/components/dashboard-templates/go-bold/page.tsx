import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const formBGCardVariants = cva("rounded-t-3xl w-full h-full ", {
  variants: {
    theme: {
      default:
        "[background-image:radial-gradient(at_71%_37%,_#12372a_0%,_transparent_60%),radial-gradient(at_83%_50%,_#436850_0%,_transparent_50%),radial-gradient(at_46%_45%,_#adbc9f_0%,_transparent_40%),radial-gradient(at_66%_54%,_#fbfada_0%,_transparent_30%)] bg-[#12372a]",
      black_plum:
        "[background-image:radial-gradient(at_69.66594827586206%_42.70833333333333%,_#c9afdf_0px,_transparent_50%),radial-gradient(at_64.27801724137932%_41.66666666666667%,_#6d70c6_0px,_transparent_50%)] bg-[#dab2ff]",
      blue_sky: "bg-zinc-950",
    },
    font: {
      Cal_San: "font-['Cal_Sans','sans-serif']",
    },
  },
  defaultVariants: {
    theme: "default",
    font: "Cal_San",
  },
});

function FormBGCard({
  className,
  theme,
  font,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof formBGCardVariants>) {
  return (
    <div
      className={cn(formBGCardVariants({ theme, font, className }))}
      {...props}
    />
  );
}

const formCardVariants = cva("w-full h-full rounded-[calc(24px_-_12px)]", {
  variants: {
    theme: {
      default: "bg-green-200/90",
      black_plum: "bg-purple-400/75",
      blue_sky: "bg-sky-200",
    },
  },
  defaultVariants: {
    theme: "default",
  },
});
function FormCard({
  className,
  theme,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof formCardVariants>) {
  return (
    <div
      className={cn("", formCardVariants({ theme, className }))}
      {...props}
    />
  );
}

export { FormBGCard, FormCard };
