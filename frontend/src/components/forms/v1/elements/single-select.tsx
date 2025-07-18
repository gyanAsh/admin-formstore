import { cn } from "@/lib/utils";
import { SingleSelectValidation } from "@/store/forms/form-elements.types";
import { FormButton } from "../button";

import { useStore } from "@nanostores/react";
import {
  $get_design_button,
  $get_design_element,
} from "@/store/forms/form-elements";
import { useState } from "react";
import { Circle, CircleCheck } from "lucide-react";

export const FormSingleSelect = ({
  singleSelect,
  goNextFunction,
}: {
  singleSelect: SingleSelectValidation;
  goNextFunction: Function;
}) => {
  const [selected, setSelected] = useState("");
  const validate = () => {
    goNextFunction();
  };

  return (
    <section className={cn(" max-w-150 flex flex-col items-end gap-2.5 grow")}>
      <div className="grid w-full gap-3">
        {singleSelect.options.map((e, idx) => {
          return (
            <Options
              key={e.id ?? idx}
              aria-selected={e.id === selected}
              className="flex items-center gap-2"
              onClick={() => {
                if (e.id !== selected) setSelected(e.id);
                else setSelected("");
              }}
            >
              {selected === e.id ? (
                <CircleCheck
                  className="stroke-2 duration-200 ease-in-out group-hover:stroke-3"
                  strokeWidth={"inherit"}
                />
              ) : (
                <Circle
                  className="stroke-2 duration-200 ease-in-out group-hover:stroke-3"
                  strokeWidth={"inherit"}
                />
              )}
              {e.text}
            </Options>
          );
        })}
      </div>

      <FormButton onClick={validate}>OK</FormButton>
    </section>
  );
};

const Options = ({ className, ...props }: React.ComponentProps<"button">) => {
  const elDesign = useStore($get_design_element);
  const btnDesign = useStore($get_design_button);

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
