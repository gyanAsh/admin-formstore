import { cn } from "@/lib/utils";
import { FormButton } from "../button";

import { useState } from "react";
import { Circle, CircleCheck } from "lucide-react";
import { useFormV1Store } from "../../state/design";
import type { SingleSelectValidation } from "../../types/elements.types";

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
              onClick={() => setSelected(e.id)}
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
  const {
    element: elDesign,
    label: design,
    button: btnDesign,
  } = useFormV1Store((state) => state.design);

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

        " text-[var(--text-color)] hover:text-[var(--btn-text-color)] aria-[selected=true]:text-[var(--btn-text-color)]",
        " bg-[var(--bg-color)]/[var(--transparant)] hover:opacity-70 hover:bg-[var(--btn-bg-color)]/[var(--transparant)] aria-[selected=true]:bg-[var(--btn-bg-color)]/[var(--transparant)]",
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
