import { cn } from "@/lib/utils";
import { FormButton } from "../button";
import type { ConsentValidation } from "../../types/elements.types";
import React, { useState } from "react";
import AnimatedCheckbox from "../checkbox";

export const FormConsent = ({
  consent,
  goNextFunction,
}: {
  consent: ConsentValidation;
  goNextFunction: Function;
}) => {
  const [checked, setChecked] = useState(false);

  const validate = () => {
    goNextFunction();
  };
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key == "y") {
        validate();
      } else if (event.key == "n") {
        validate();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [validate]);
  return (
    <section className={cn(" max-w-150 flex flex-col gap-2.5 grow")}>
      <div className="grid place-items-center gap-5">
        <div className="w-fit flex items-center gap-5 relative">
          <AnimatedCheckbox
            className="-translate-x-[calc(100%_+_10px)] absolute"
            checked={checked}
            onClick={() => setChecked((e) => !e)}
          />
          <FormButton className="w-full" onClick={validate}>
            {consent.acceptBtnText}
          </FormButton>
        </div>
      </div>
    </section>
  );
};
