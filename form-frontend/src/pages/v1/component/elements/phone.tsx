import { cn } from "@/lib/utils";
import { FormButton } from "../button";
import { useEffect, useState } from "react";
import { z } from "zod";

import { useFormV1Store } from "../../state/design";
import { FormTypes, type PhoneValidation } from "../../types/elements.types";
import useAutoFocusOnVisible from "@/hooks/use-autofocus-on-visible";
import { toast } from "sonner";

const phoneSchema = z.string().regex(/^\+\d+$/, {
  message: "Must start with '+' followed by digits only",
});

export const FormPhone = ({
  phone,
  seq_number,
  required,
  goNextFunction,
}: {
  phone: PhoneValidation;
  required: Boolean;
  seq_number: number;
  goNextFunction: Function;
}) => {
  const [inputState, setInputState] = useState("");

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
    const result = phoneSchema.safeParse(inputState);
    if (!result.success) {
      let error = result.error.errors.at(0)?.message;
      toast.warning(error);
      throw new Error(error);
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (typeof inputState === "string") {
        updateValue({
          seq_number: seq_number,
          value: inputState,
          type: FormTypes.phone,
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
        type="string"
        id="phone-element"
        className={cn(
          "w-full border-2 py-2 md:py-3 px-3 md:px-4.5 text-lg md:text-xl",

          "text-[var(--text-color)] [font-family:var(--input-family)] border-[var(--border-color)]/60 placeholder:text-[var(--text-color)]/65 outline-0 focus:border-[var(--border-color)] w-full h-fit py-2 px-4 text-lg rounded-full font-medium placeholder:italic bg-[var(--bg-color)]/[var(--transparant)]",
          { " backdrop-blur-xs": elDesign.variant === "glass" }
        )}
        style={elStyle}
        ref={ref}
        placeholder={phone.placeholder}
        value={inputState}
        onChange={(e) => {
          const value = e.target.value;
          // Allow only "+", followed by digits
          if (/^\+?\d*$/.test(value)) {
            setInputState(value);
          }
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            const nextBtn = document.getElementById(
              "validateGoNext"
            ) as HTMLButtonElement;
            if (!!nextBtn) {
              nextBtn.click();
            }
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
