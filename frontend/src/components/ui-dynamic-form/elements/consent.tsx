import { cn } from "@/lib/utils";
import {
  FormColor,
  FormFontFamily,
} from "@/store/designs/design-elements.types";
import { ConsentValidation } from "@/store/forms/form-elemets.types";
import { FormButton } from "../button";

export const FormConsent = ({
  family,
  consent,
  theme,
  goNextFunction,
}: {
  consent: ConsentValidation;
  family: FormFontFamily;
  theme: FormColor;
  goNextFunction: Function;
}) => {
  const validate = () => {
    goNextFunction();
  };

  return (
    <section
      className={cn(
        " max-w-150 flex flex-col gap-2.5 grow",
        { "font-['Cal_Sans','sans-serif']": family == "Cal_San" },
        { "font-['Playfair_Display','serif']": family == "Playfair_Display" },
        { "font-['IBM_Plex_Serif','serif']": family == "IBM_Plex_Serif" },
        { "font-['Roboto','sans-serif']": family == "Roboto" }
      )}
    >
      <div className="flex items-start justify-center md:justify-between gap-5">
        <FormButton theme={theme} variant="destructive" onClick={validate}>
          {consent.rejectBtnText}
        </FormButton>
        <FormButton theme={theme} onClick={validate}>
          {consent.acceptBtnText}
        </FormButton>
      </div>
    </section>
  );
};
