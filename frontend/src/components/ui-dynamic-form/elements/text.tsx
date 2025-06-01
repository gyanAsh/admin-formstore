import { cn } from "@/lib/utils";
import {
  FormColor,
  FormFontFamily,
} from "@/store/designs/design-elements.types";
import { TextValidation } from "@/store/forms/form-elemets.types";
import { TextArea } from "react-aria-components";
import { FormButton } from "../button";
import { useState } from "react";

export const FormText = ({
  family,
  text,
  theme,
  goNextFunction,
}: {
  text: TextValidation;
  family: FormFontFamily;
  theme: FormColor;
  goNextFunction: Function;
}) => {
  const [textState, setTextState] = useState("");

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
      <TextArea
        id="element-description"
        autoFocus
        value={textState}
        onChange={(e) => {
          setTextState(e.target.value);
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === "Enter") {
            validate();
          }
        }}
        placeholder="Your Description here."
        //   className="field-sizing-content max-h-29.5 min-h-0 resize-none py-1.75"
        className={cn(
          "field-sizing-content min-h-14 resize-none w-full border-2 py-2 md:py-3 px-3 md:px-4.5 ",
          { "text-lg md:text-xl": "size" === "size" },

          {
            "bg-green-50 text-zinc-900 border-emerald-500 data-focused:outline-emerald-500 placeholder:text-zinc-500/75":
              theme === "forest",
          },

          { "text-zinc-300": theme == "noir" },
          { "text-zinc-900": theme == "sky" },
          { "text-zinc-800": theme == "violet" }
        )}
      />
      <div className="flex items-start justify-end gap-2.5">
        <FormButton theme={theme} className="" onClick={validate}>
          OK
        </FormButton>
      </div>
    </section>
  );
};
