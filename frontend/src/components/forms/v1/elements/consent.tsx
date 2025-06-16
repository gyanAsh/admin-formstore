import { cn } from "@/lib/utils";
import { ConsentValidation } from "@/store/forms/form-elements.types";
import { FormButton } from "../button";

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

  return (
    <section className={cn(" max-w-150 flex flex-col gap-2.5 grow")}>
      <div className="flex items-start justify-center md:justify-between gap-5">
        <FormButton onClick={validate}>{consent.rejectBtnText}</FormButton>
        <FormButton onClick={validate}>{consent.acceptBtnText}</FormButton>
      </div>
    </section>
  );
};
