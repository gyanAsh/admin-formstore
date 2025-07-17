import { cn } from "@/lib/utils";
import { useFormV1Store } from "../state/design";

export const FormBackground = ({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const { layout: design, label: labelDesign } = useFormV1Store(
    (state) => state.design
  );

  const style: Record<string, string> & React.CSSProperties = {
    "--bg-color": design.bgSolidValue?.color || "transparent",
    "--bg-custom": `${design.bgCustomValue?.value}`,
    "--bg-img": `url(${design.bgImageValue?.imageUrl})`,
    "--label-text-color": labelDesign.color,
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
      {children}
    </div>
  );
};
