import { cn, delay } from "@/lib/utils";
// import { FormButton } from "../button";
import { FormTypes, type YesNoValidation } from "../../types/elements.types";
import React, { useEffect, useState } from "react";
import { useFormV1Store } from "../../state/design";
import { FormButton } from "../button";
import { toast } from "sonner";

export const FormYesNo = ({
  yesno,
  seq_number,
  required,
  goNextFunction,
}: {
  yesno: YesNoValidation;
  seq_number: number;
  required: boolean;
  goNextFunction: Function;
}) => {
  const [selected, setSelected] = useState("");
  const updateValue = useFormV1Store((state) => state.updateInputState);
  const getInputBySeqNumber = useFormV1Store(
    (state) => state.getInputBySeqNumber
  );
  const validate = () => {
    if (selected.length < 1) {
      let error = "Select an option between these options.";
      toast.warning(error);
      throw new Error(error);
    }
  };

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.key === "y" || event.key === "Y") {
        setSelected("yes");
        await delay(500);
        const nextBtn = document.getElementById(
          "validateGoNext"
        ) as HTMLButtonElement;
        if (!!nextBtn) {
          nextBtn.click();
        }
      } else if (event.key === "n" || event.key === "N") {
        setSelected("no");
        await delay(500);
        const nextBtn = document.getElementById(
          "validateGoNext"
        ) as HTMLButtonElement;
        if (!!nextBtn) {
          nextBtn.click();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [validate]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (typeof selected === "string") {
        updateValue({
          seq_number: seq_number,
          value: selected,
          type: FormTypes.yesno,
        });
      }
    }, 500);

    return () => clearTimeout(timeout); // cancel previous write
  }, [selected]);
  useEffect(() => {
    if (typeof seq_number === "number") {
      let oldinput = getInputBySeqNumber(seq_number);
      if (oldinput !== undefined) {
        setSelected(oldinput.value);
      }
    }
  }, [seq_number]);

  return (
    <section className={cn(" max-w-150 flex flex-col gap-2.5 grow")}>
      <div className="grid md:grid-cols-2 place-items-center gap-5">
        <Options
          aria-selected={"no" === selected}
          className="flex items-center justify-center gap-2"
          onClick={() => {
            if ("no" !== selected) {
              setSelected("no");
            } else setSelected("");
          }}
        >
          {yesno.noBtnText}
        </Options>
        <Options
          aria-selected={"yes" === selected}
          className="flex items-center justify-center gap-2"
          onClick={() => {
            if ("yes" !== selected) {
              setSelected("yes");
            } else setSelected("");
          }}
        >
          {yesno.yesBtnText}
        </Options>
      </div>
      <div className="flex items-start justify-end gap-2.5">
        <FormButton
          validateFunction={validate}
          required={required}
          goNextFunction={goNextFunction}
        />
      </div>
    </section>
  );
};

const Options = ({ className, ...props }: React.ComponentProps<"button">) => {
  const { element: elDesign, button: btnDesign } = useFormV1Store(
    (state) => state.design
  );

  const elStyle: Record<string, string> & React.CSSProperties = {
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
    "--btn-border-color":
      btnDesign?.borderColor !== elDesign.borderColor
        ? btnDesign?.borderColor || "white"
        : "white",
    "--transparant":
      elDesign.variant === "glass"
        ? "20%"
        : elDesign.variant === "outline"
        ? "0%"
        : "100%",
  };
  return (
    <button
      className={cn(
        "w-full text-start whitespace-pre-line",
        " px-2.5 md:px-3 py-2.5 md:py-3 cursor-pointer",
        "group duration-200 transition-all",

        " aria-[selected=false]:hover:opacity-70",
        " text-[var(--text-color)] hover:text-[var(--btn-text-color)] aria-[selected=true]:text-[var(--btn-text-color)] hover:border-[var(--btn-border-color)]",
        " bg-[var(--bg-color)]/[var(--transparant)] hover:bg-[var(--btn-bg-color)]/[var(--transparant)] aria-[selected=true]:bg-[var(--btn-bg-color)]/[var(--transparant)]",
        "rounded-full [font-family:var(--input-family)] text-lg",
        "border-2 border-[var(--border-color)]",
        { " backdrop-blur-[1px]": elDesign.variant === "glass" },
        className
      )}
      style={elStyle}
      {...props}
    />
  );
};
