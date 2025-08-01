import { cn } from "@/lib/utils";
import { FormButton } from "../button";
import { useState } from "react";
import { z } from "zod";

import { useFormV1Store } from "../../state/design";
import type { PhoneValidation } from "../../types/elements.types";
import useAutoFocusOnVisible from "@/hooks/use-autofocus-on-visible";
import { toast } from "sonner";

const phoneSchema = z.string().regex(/^\+\d+$/, {
  message: "Must start with '+' followed by digits only",
});

export const FormPhone = ({
  phone,
  goNextFunction,
}: {
  phone: PhoneValidation;
  goNextFunction: Function;
}) => {
  const [inputState, setInputState] = useState("");

  const { ref } = useAutoFocusOnVisible<HTMLInputElement>(0.5);

  const { element: elDesign } = useFormV1Store((state) => state.design);

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
      toast.warning(result.error.errors.at(0)?.message);
      return;
    }
    goNextFunction();
  };

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
            validate();
          }
        }}
      />
      <div className="flex items-start justify-end gap-2.5">
        <FormButton onClick={validate}>OK</FormButton>
      </div>
    </section>
  );
};
