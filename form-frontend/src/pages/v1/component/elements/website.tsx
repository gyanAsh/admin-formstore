import { cn } from "@/lib/utils";
// import { Input } from "react-aria-components";
import { FormButton } from "../button";
import { useEffect, useState } from "react";
import { z } from "zod";

import { useFormV1Store } from "../../state/design";
import { FormTypes, type UrlValidation } from "../../types/elements.types";
import useAutoFocusOnVisible from "@/hooks/use-autofocus-on-visible";
import { toast } from "sonner";

const urlSchema = z
  .string()
  .url({ message: "Please enter a valid URL, eg: https:// or http://" });

export const FormWebsite = ({
  url,
  seq_number,
  goNextFunction,
}: {
  url: UrlValidation;
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
    const result = urlSchema.safeParse(inputState);
    if (!result.success) {
      toast.warning(result.error.errors.at(0)?.message);
      return;
    }
    updateValue({
      seq_number: seq_number,
      value: result.data,
      type: FormTypes.phone,
    });
    goNextFunction();
  };
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
        type="url"
        id="url-element"
        className={cn(
          "w-full border-2 py-2 md:py-3 px-3 md:px-4.5 text-lg md:text-xl",

          "text-[var(--text-color)] [font-family:var(--input-family)] border-[var(--border-color)]/60 placeholder:text-[var(--text-color)]/65 outline-0 focus:border-[var(--border-color)] w-full h-fit py-2 px-4 text-lg rounded-full font-medium placeholder:italic bg-[var(--bg-color)]/[var(--transparant)]",
          { " backdrop-blur-xs": elDesign.variant === "glass" }
        )}
        style={elStyle}
        ref={ref}
        // autoFocus={true}
        placeholder={url.placeholder}
        formNoValidate
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
        <FormButton onClick={validate}>OK</FormButton>
      </div>
    </section>
  );
};
