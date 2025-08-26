import { cn, delay } from "@/lib/utils";
import { FormButton } from "../button";
import { FormTypes, type ConsentValidation } from "../../types/elements.types";
import React, { useEffect, useState } from "react";
import AnimatedCheckbox from "../checkbox";
import { useFormV1Store } from "../../state/design";
import { toast } from "sonner";

export const FormConsent = ({
  consent,
  seq_number,
  required,
  goNextFunction,
}: {
  consent: ConsentValidation;
  required: Boolean;
  seq_number: number;
  goNextFunction: Function;
}) => {
  const [checked, setChecked] = useState(false);
  const updateValue = useFormV1Store((state) => state.updateInputState);
  const getInputBySeqNumber = useFormV1Store(
    (state) => state.getInputBySeqNumber
  );
  const validate = () => {
    if (checked !== true) {
      let error = "Consent is required before you proceed.";
      toast.warning(error);
      throw new Error(error);
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "a" || event.key === "A") {
        setChecked(true);
        delay(500).then(() => {
          const nextBtn = document.getElementById(
            "validateGoNext"
          ) as HTMLButtonElement;
          if (!!nextBtn) {
            nextBtn.click();
          }
        });
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
      if (typeof checked === "boolean") {
        updateValue({
          seq_number: seq_number,
          value: checked,
          type: FormTypes.consent,
        });
      }
    }, 500);

    return () => clearTimeout(timeout); // cancel previous write
  }, [checked]);

  useEffect(() => {
    if (typeof seq_number === "number") {
      let oldinput = getInputBySeqNumber(seq_number);
      if (oldinput !== undefined) {
        setChecked(oldinput.value);
      }
    }
  }, [seq_number]);
  return (
    <section className={cn(" max-w-150 flex flex-col gap-2.5 grow")}>
      <div className="grid place-items-center gap-5">
        <div className="w-fit flex items-center gap-5 relative">
          <AnimatedCheckbox
            className="-translate-x-[calc(100%_+_10px)] absolute"
            checked={checked}
            onClick={() => setChecked((e) => !e)}
          />
          <FormButton
            className="w-full"
            validateFunction={validate}
            required={required}
            goNextFunction={goNextFunction}
            text={consent.acceptBtnText}
          />
        </div>
      </div>
    </section>
  );
};
