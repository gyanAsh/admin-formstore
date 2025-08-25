import { cn } from "@/lib/utils";
import { FormButton } from "../button";

import { useEffect, useState } from "react";
import { useFormV1Store } from "../../state/design";
import { FormTypes } from "../../types/elements.types";

export const FormNPS = ({
  seq_number,
  required,
  goNextFunction,
}: {
  seq_number: number;
  required: Boolean;
  goNextFunction: Function;
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const updateValue = useFormV1Store((state) => state.updateInputState);
  const getInputBySeqNumber = useFormV1Store(
    (state) => state.getInputBySeqNumber
  );
  const validate = () => {
    updateValue({
      seq_number: seq_number,
      value: selected,
      type: FormTypes.nps,
    });
  };

  useEffect(() => {
    if (typeof seq_number === "number") {
      let oldinput = getInputBySeqNumber(seq_number);

      if (oldinput !== undefined) {
        setSelected(oldinput.value);
      }
    }
  }, [seq_number]);

  return (
    <section className={cn(" max-w-150 flex flex-col items-end gap-4.5 grow")}>
      <NPSContainer className="grid grid-cols-11 w-full divide-x">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e, idx) => {
          return (
            <div
              key={idx}
              className={cn(
                "grid place-items-center aspect-6/8 md:aspect-square col-span-1 text-lg sm:text-xl first:hover:rounded-l-full last:hover:rounded-r-full transition-all duration-200 ease-out",
                {
                  " hover:text-xl sm:hover:text-3xl hover:opacity-70 hover:bg-[var(--btn-bg-color)] hover:text-[var(--btn-text-color)]":
                    selected === null,
                },
                {
                  " text-xl sm:text-3xl bg-[var(--btn-bg-color)] text-[var(--btn-text-color)]":
                    selected === e,
                }
              )}
              onClick={async () => {
                setSelected(e);
              }}
            >
              {e}
            </div>
          );
        })}
      </NPSContainer>

      <FormButton
        validateFunction={validate}
        required={required}
        goNextFunction={goNextFunction}
      >
        OK
      </FormButton>
    </section>
  );
};

const NPSContainer = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const {
    element: elDesign,
    button: btnDesign,
    description: desDesign,
  } = useFormV1Store((state) => state.design);

  const elStyle: Record<string, string> & React.CSSProperties = {
    "--label-text-color": desDesign.color,
    "--text-color": elDesign.textColor,
    "--bg-color": elDesign.bgColor,
    "--border-color": elDesign.borderColor,
    "--btn-bg-color":
      btnDesign?.bgColor !== elDesign.bgColor
        ? btnDesign?.bgColor || "black"
        : "black",
    "--btn-text-color":
      btnDesign?.textColor !== elDesign.textColor
        ? btnDesign?.textColor || "white"
        : "white",
    "--transparant":
      elDesign.variant === "glass"
        ? "20%"
        : elDesign.variant === "outline"
        ? "0%"
        : "100%",
  };

  return (
    <>
      <div
        className={cn(
          "w-full text-start whitespace-pre-line",
          "rounded-full cursor-pointer",
          "group duration-200 transition-colors",

          "text-[var(--text-color)] [font-family:var(--input-family)] text-lg bg-[var(--bg-color)]/[var(--transparant)]",
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
          "text-[var(--label-text-color)] [font-family:var(--input-family)] text-base md:text-lg"
        )}
      >
        <h3>0 - Not likely at all</h3>
        <h3>10 - Extremely likely</h3>
      </div>
    </>
  );
};
