import { cn, delay } from "@/lib/utils";
import { FormButton } from "../button";

import { useState } from "react";
import { useFormV1Store } from "../../state/design";

export const FormNPS = ({ goNextFunction }: { goNextFunction: Function }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const validate = () => {
    goNextFunction();
  };

  return (
    <section className={cn(" max-w-150 flex flex-col items-end gap-4.5 grow")}>
      <NPSContainer className="grid grid-cols-11 w-full divide-x">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e, idx) => {
          return (
            <div
              key={idx}
              className={cn(
                "grid place-items-center aspect-6/8 md:aspect-square col-span-1 text-xl  first:hover:rounded-l-full last:hover:rounded-r-full transition-all duration-200 ease-out",
                {
                  "hover:text-3xl hover:bg-black hover:text-white":
                    selected === null,
                },
                { " text-3xl bg-black text-white": selected === e }
              )}
              onClick={async () => {
                setSelected(e);
                await delay(200);
                validate();
              }}
            >
              {e}
            </div>
          );
        })}
      </NPSContainer>

      <FormButton onClick={validate}>OK</FormButton>
    </section>
  );
};

const NPSContainer = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { element: elDesign, label: design } = useFormV1Store(
    (state) => state.design
  );

  const elStyle: Record<string, string> & React.CSSProperties = {
    "--family": design.family,
    "--text-color": elDesign.textColor,
    "--bg-color": elDesign.bgColor,
    "--border-color": elDesign.borderColor,
    "--transparant":
      elDesign.variant === "glass"
        ? "20%"
        : elDesign.variant === "outline"
        ? "0%"
        : "100%",
  };

  const textStyle: Record<string, string> & React.CSSProperties = {
    "--text-color": design.color,
    "--family": design.family,
  };
  return (
    <>
      <div
        className={cn(
          "w-full text-start whitespace-pre-line",
          "rounded-full cursor-pointer",
          "group duration-200 transition-colors",

          "text-[var(--text-color)] [font-family:var(--family)] text-lg bg-[var(--bg-color)]/[var(--transparant)]",
          "border-2 border-[var(--border-color)] divide-x-2 divide-[var(--border-color)] hover:text-[var(--text-color)] hover:bg-[var(--bg-color)]/[var(--transparant)]",
          { " backdrop-blur-[1px]": elDesign.variant === "glass" },
          className
        )}
        style={elStyle}
        {...props}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex items-center justify-between w-full rounded-full px-4",
          "text-[var(--text-color)] [font-family:var(--family)] text-base md:text-lg"
        )}
        style={textStyle}
      >
        <h3>0 - Not likely at all</h3>
        <h3>10 - Extremely likely</h3>
      </div>
    </>
  );
};
