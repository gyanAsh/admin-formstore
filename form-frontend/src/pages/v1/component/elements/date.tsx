import { cn } from "@/lib/utils";
import { FormButton } from "../button";
import { useEffect, useState } from "react";
import { z } from "zod";
import useAutoFocusOnVisible from "@/hooks/use-autofocus-on-visible";
import { useFormV1Store } from "../../state/design";
import { FormTypes, type DateValidation } from "../../types/elements.types";
import { toast } from "sonner";

export const FormDate = ({
  number,
  seq_number,
  required,
  goNextFunction,
}: {
  number: DateValidation;
  required: Boolean;
  seq_number: number;
  goNextFunction: Function;
}) => {
  const [inputState, setInputState] = useState(number.defaultValue || "");

  const { ref } = useAutoFocusOnVisible<HTMLInputElement>(0.5);

  const { element: elDesign } = useFormV1Store((state) => state.design);
  const updateValue = useFormV1Store((state) => state.updateInputState);
  const getInputBySeqNumber = useFormV1Store(
    (state) => state.getInputBySeqNumber
  );

  const elStyle: Record<string, string> & React.CSSProperties = {
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

  const validate = () => {
    const schema = z
      .object({
        date: z.date(),
        activeMinMaxRange: z.boolean(),
        minValue: z.date(),
        maxValue: z.date(),
      })
      .refine(
        (data) => {
          if (!data.activeMinMaxRange) return true; // Skip range check if not active

          const { date, minValue, maxValue } = data;
          return date >= minValue && date <= maxValue;
        },
        {
          message: `Date must be between ${number.minValue} and ${number.maxValue}`,
          path: ["date"], // This sets the error to the `date` field
        }
      );
    const result = schema.safeParse({
      date: new Date(inputState),
      activeMinMaxRange: number.activateMinMaxRange,
      minValue: new Date(number.minValue),
      maxValue: new Date(number.maxValue),
    });

    if (!result.success) {
      toast.warning(result.error.errors.at(0)?.message);
      throw new Error(result.error.errors.at(0)?.message);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (typeof inputState === "string") {
        updateValue({
          seq_number: seq_number,
          value: inputState,
          type: FormTypes.date,
        });
      }
    }, 500);

    return () => clearTimeout(timeout); // cancel previous write
  }, [inputState]);

  useEffect(() => {
    if (typeof seq_number === "number") {
      let oldinput = getInputBySeqNumber(seq_number);
      if (oldinput !== undefined) {
        setInputState(oldinput.value);
      }
    }
  }, [seq_number]);

  return (
    <section className={cn(" max-w-150 flex flex-col gap-2.5 grow")}>
      <input
        type="date"
        id="date-element"
        className={cn(
          "w-full border-2 py-2 md:py-3 px-3 md:px-4.5 text-lg md:text-xl",

          "text-[var(--text-color)] [font-family:var(--input-family)] border-[var(--border-color)]/60 placeholder:text-[var(--text-color)]/65 outline-0 focus:border-[var(--border-color)] w-full h-fit py-2 px-4 text-lg rounded-full font-medium placeholder:italic bg-[var(--bg-color)]/[var(--transparant)]",
          { " backdrop-blur-xs": elDesign.variant === "glass" }
        )}
        style={elStyle}
        ref={ref}
        min={number.minValue}
        max={number.maxValue}
        value={inputState}
        onChange={(e) => {
          setInputState(e.target.value);
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            validate();
          }
        }}
      />
      <div className="flex items-start justify-end gap-2.5">
        <FormButton
          validateFunction={validate}
          required={required || inputState.length > 0}
          goNextFunction={goNextFunction}
        />
      </div>
    </section>
  );
};
