import { cn } from "@/lib/utils";
import { ConsentValidation } from "@/store/forms/form-elements.types";
import { FormButton } from "../button";
import { useStore } from "@nanostores/react";
import { $current_form } from "@/store/forms/form-elements";

export const FormConsent = ({
  consent,
  goNextFunction,
}: {
  consent: ConsentValidation;
  goNextFunction: Function;
}) => {
  const currentForm = useStore($current_form);
  const theme = currentForm.design.theme;

  const validate = () => {
    goNextFunction();
  };

  return (
    <section className={cn(" max-w-150 flex flex-col gap-2.5 grow")}>
      <div className="flex items-start justify-center md:justify-between gap-5">
        <FormButton theme={theme} variant="secondary" onClick={validate}>
          {consent.rejectBtnText}
        </FormButton>
        <FormButton theme={theme} onClick={validate}>
          {consent.acceptBtnText}
        </FormButton>
      </div>
    </section>
  );
};
