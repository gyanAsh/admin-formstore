import { cn } from "@/lib/utils";
import { FormButton } from "../button";
import { useEffect, useState } from "react";
import { Square, SquareCheck } from "lucide-react";
import { useFormV1Store } from "../../state/design";
import {
  FormTypes,
  type MultiSelectValidation,
} from "../../types/elements.types";

export const FormMultiSelect = ({
  multiSelect,
  seq_number,
  goNextFunction,
}: {
  multiSelect: MultiSelectValidation;
  seq_number: number;
  goNextFunction: Function;
}) => {
  const updateValue = useFormV1Store((state) => state.updateInputState);
  const getInputBySeqNumber = useFormV1Store(
    (state) => state.getInputBySeqNumber
  );
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const validate = () => {
    let selectedOptions = multiSelect.options.filter((option) =>
      selected.has(option.id)
    );
    updateValue({
      seq_number: seq_number,
      value: selectedOptions,
      type: FormTypes.phone,
    });
    goNextFunction();
  };
  useEffect(() => {
    if (typeof seq_number === "number") {
      let oldinput = getInputBySeqNumber(seq_number);
      if (oldinput !== undefined) {
        const idSet = new Set<string>(
          oldinput.value.map((item: { id: string }) => item.id)
        );
        setSelected(idSet);
      }
    }
  }, [seq_number]);

  return (
    <section className={cn(" max-w-150 flex flex-col items-end gap-2.5 grow")}>
      <div className="grid w-full gap-3">
        {multiSelect.options.map((e, idx) => {
          return (
            <Options
              key={e.id ?? idx}
              aria-selected={selected.has(e.id)}
              className="flex items-center gap-2"
              onClick={() => toggleSelect(e.id)}
            >
              {selected.has(e.id) ? (
                <SquareCheck
                  className="stroke-2 duration-200 ease-in-out group-hover:stroke-3"
                  strokeWidth={"inherit"}
                />
              ) : (
                <Square
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
