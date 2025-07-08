import { cn } from "@/lib/utils";
import { SingleSelectValidation } from "@/store/forms/form-elements.types";
import { FormButton } from "../button";

import { useStore } from "@nanostores/react";
import {
  $get_design_element,
  $get_design_label,
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
  const elDesign = useStore($get_design_element);
  const design = useStore($get_design_label);

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
  return (
    <button
      className={cn(
        "w-full text-start whitespace-pre-line",
        " px-2.5 md:px-3 py-2.5 md:py-3 cursor-pointer",
        "group duration-200 hover:font-bold transition-colors",

        "rounded-full text-[var(--text-color)] [font-family:var(--family)] text-lg bg-[var(--bg-color)]/[var(--transparant)]",
        "border-2 border-[var(--border-color)] hover:text-[var(--text-color)] hover:bg-[var(--bg-color)]/[var(--transparant)]",
        { " backdrop-blur-[1px]": elDesign.variant === "glass" },
        className
      )}
      style={elStyle}
      {...props}
    />
  );
};
