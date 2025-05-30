import { cn } from "@/lib/utils";
import {
  FormColor,
  FormFontFamily,
} from "@/store/designs/design-elements.types";
import { EmailValidation } from "@/store/forms/form-elemets.types";
import { Input } from "react-aria-components";

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
        " max-w-150 grow",
        { "font-['Cal_Sans','sans-serif']": family == "Cal_San" },
        { "font-['Playfair_Display','serif']": family == "Playfair_Display" },
        { "font-['IBM_Plex_Serif','serif']": family == "IBM_Plex_Serif" },
        { "font-['Roboto','sans-serif']": family == "Roboto" }
      )}
    >
      <Input
        type="email"
        className={cn(
          "w-full border py-2 md:py-3 px-3 md:px-4.5 ",
          { "text-lg md:text-xl": "size" === "size" },

          {
            "bg-green-100/75 border-green-500 data-focused:outline-green-500":
              theme === "forest",
          },

          { "text-zinc-300": theme == "noir" },
          { "text-zinc-900": theme == "sky" },
          { "text-zinc-800": theme == "violet" }
        )}
        placeholder={email.placeholder}
      />
    </section>
  );
};
