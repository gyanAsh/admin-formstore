import { cn } from "@/lib/utils";
import { FormTheme } from "@/store/forms/designs/design-elements.types";
import { ConsentValidation } from "@/store/forms/form-elemets.types";
import { FormButton } from "../button";

export const FormConsent = ({
  consent,
  theme,
  goNextFunction,
}: {
  consent: ConsentValidation;
  theme: FormTheme;
  goNextFunction: Function;
}) => {
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
