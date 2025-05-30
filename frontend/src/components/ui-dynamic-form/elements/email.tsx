import { cn } from "@/lib/utils";
import {
  FormColor,
  FormFontFamily,
} from "@/store/designs/design-elements.types";
import { EmailValidation } from "@/store/forms/form-elemets.types";
import { Input } from "react-aria-components";
import { FormButton } from "../button";
import { FormErrorMsgPopUp } from "../error-card";

export const FormEmail = ({
  family,
  email,
  theme,
}: {
  email: EmailValidation;
  family: FormFontFamily;
  theme: FormColor;
}) => {
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
      <Input
        type="email"
        className={cn(
          "w-full border-2 py-2 md:py-3 px-3 md:px-4.5 ",
          { "text-lg md:text-xl": "size" === "size" },

          {
            "bg-green-100 text-zinc-900 border-emerald-500 data-focused:outline-emerald-500 placeholder:text-zinc-500/75":
              theme === "forest",
          },

          { "text-zinc-300": theme == "noir" },
          { "text-zinc-900": theme == "sky" },
          { "text-zinc-800": theme == "violet" }
        )}
        placeholder={email.placeholder}
      />
      <div className="flex items-start justify-end gap-2.5">
        <FormErrorMsgPopUp type="warn" msg="Oops! Invalid Email ID" />
        <FormButton theme={theme} className="">
          OK
        </FormButton>
      </div>
    </section>
  );
};
