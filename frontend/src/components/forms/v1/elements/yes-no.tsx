import { cn, delay } from "@/lib/utils";
// import { FormButton } from "../button";
import React, { useState } from "react";
import { YesNoValidation } from "@/store/forms/form-elements.types";
import { useStore } from "@nanostores/react";
import {
  $get_design_button,
  $get_design_element,
  $get_design_label,
} from "@/store/forms/form-elements";

export const FormYesNo = ({
  yesno,
  goNextFunction,
}: {
  yesno: YesNoValidation;
  goNextFunction: Function;
}) => {
  const [selected, setSelected] = useState("");

  const validate = async () => {
    await delay(1000);
    goNextFunction();
  };

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key == "y") {
        setSelected("yes");
        validate();
      } else if (event.key == "n") {
        setSelected("no");
        validate();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [validate]);
  return (
    <section className={cn(" max-w-150 flex flex-col gap-2.5 grow")}>
      <div className="grid md:grid-cols-2 place-items-center gap-5">
        {/* <FormButton className="w-full" onClick={validate}>
          {yesno.noBtnText}
        </FormButton>
        <FormButton className="w-full" onClick={validate}>
          {yesno.yesBtnText}
        </FormButton> */}
        <Options
          aria-selected={"no" === selected}
          className="flex items-center justify-center gap-2"
          onClick={() => {
            if ("no" !== selected) {
              setSelected("no");
              validate();
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
              validate();
            } else setSelected("");
          }}
        >
          {yesno.yesBtnText}
        </Options>
      </div>
    </section>
  );
};

const Options = ({ className, ...props }: React.ComponentProps<"button">) => {
  const elDesign = useStore($get_design_element);
  const btnDesign = useStore($get_design_button);
  const design = useStore($get_design_label);

  const elStyle: Record<string, string> & React.CSSProperties = {
    "--family": design.family,
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
        "rounded-full [font-family:var(--family)] text-lg",
        "border-2 border-[var(--border-color)]",
        { " backdrop-blur-[1px]": elDesign.variant === "glass" },
        className
      )}
      style={elStyle}
      {...props}
    />
  );
};
