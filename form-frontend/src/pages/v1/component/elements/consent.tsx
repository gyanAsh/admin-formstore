import { cn } from "@/lib/utils";
import { FormButton } from "../button";
import type { ConsentValidation } from "../../types/elements.types";
import React from "react";

export const FormConsent = ({
  consent,
  goNextFunction,
}: {
  consent: ConsentValidation;
  goNextFunction: Function;
}) => {
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
      <div className="grid md:grid-cols-2 place-items-center gap-5">
        <FormButton className="w-full" onClick={validate}>
          {consent.rejectBtnText}
        </FormButton>
        <FormButton className="w-full" onClick={validate}>
          {consent.acceptBtnText}
        </FormButton>
      </div>
    </section>
  );
};
