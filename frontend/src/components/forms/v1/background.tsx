import { cn } from "@/lib/utils";
import { $get_design_layout } from "@/store/forms/form-elements";
import { useStore } from "@nanostores/react";

export const FormBackground = ({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const design = useStore($get_design_layout);

  const style: Record<string, string> & React.CSSProperties = {
    "--bg-color": design.bgSolidValue?.color || "transparent",
    "--bg-custom": `${design.bgCustomValue?.value}`,
    "--bg-img": `url(${design.bgImageValue?.imageUrl})`,
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden h-full cursor-default ",
        {
          "bg-[var(--bg-color)]": design.bgType === "solid",
        },
        {
          "[background:var(--bg-custom)] bg-cover bg-center":
            design.bgType === "custom",
        },
        {
          " [background-image:var(--bg-img)] bg-cover bg-center":
            design.bgType === "image",
        },

        className
      )}
      style={style}
      {...props}
    >
      {/* {design.addNoise && <div className="grain-overlay" />} */}
      {/* {design.addBlur && (
        <div className="absolute rounded-4xl inset-0 backdrop-blur-sm" />
      )} */}

      {children}
    </div>
  );
};
