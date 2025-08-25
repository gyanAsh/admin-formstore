import { cn, delay } from "@/lib/utils";
import { FormButton } from "../button";
import { FormTypes, type ConsentValidation } from "../../types/elements.types";
import React, { useEffect, useState } from "react";
import AnimatedCheckbox from "../checkbox";
import { useFormV1Store } from "../../state/design";

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
  const validate = async () => {
    await delay(1000);
    updateValue({
      seq_number: seq_number,
      value: true,
      type: FormTypes.consent,
    });
  };
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key == "a") {
        setChecked(true);
        validate();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [validate]);
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
            disabled={!checked}
            validateFunction={validate}
            required={required}
            goNextFunction={goNextFunction}
          >
            {consent.acceptBtnText}
          </FormButton>
        </div>
      </div>
    </section>
  );
};
