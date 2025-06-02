import { cn } from "@/lib/utils";
import {
  FormColor,
  FormFontFamily,
} from "@/store/designs/design-elements.types";
import { TextValidation } from "@/store/forms/form-elemets.types";
import { TextArea } from "react-aria-components";
import { FormButton } from "../button";
import { useState } from "react";
import { FormErrorMsgPopUp } from "../error-card";

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
  const [showError, setShowError] = useState<{
    show: boolean;
    msg: string;
    type: "warn" | "error";
  }>({ show: false, msg: "", type: "error" });

  const validate = () => {
    if (textState.length < text.minLength) {
      setShowError({ show: true, msg: "Text too short.", type: "warn" });
      return;
    } else if (textState.length > text.maxLength) {
      setShowError({ show: true, msg: "Text too long.", type: "warn" });
      return;
    }
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
          let val = e.target.value;
          setTextState(e.target.value);
          if (val.length > text.maxLength) {
            setShowError({ show: true, msg: "Text too long.", type: "warn" });
          } else {
            setShowError((prev) => ({ ...prev, show: false }));
          }
        }}
        // onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        //   if (e.key === "Enter") {
        //     validate();
        //   }
        // }}
        placeholder="Your text here..."
        //   className="field-sizing-content max-h-29.5 min-h-0 resize-none py-1.75"
        className={cn(
          "field-sizing-content min-h-14 resize-none w-full border-2 py-2 md:py-3 px-3 md:px-4.5 ",
          { "text-lg md:text-xl": "size" === "size" },
          {
            "bg-green-50 text-zinc-900 border-emerald-500 data-focused:outline-emerald-500 placeholder:text-zinc-500/75":
              theme === "forest",
          },
          {
            "bg-white/50 text-zinc-800 border-zinc-700 data-focused:outline-zinc-700 placeholder:text-zinc-500/85":
              theme === "trance_sky",
          },
          { "text-zinc-300": theme == "noir" },
          {
            "bg-blue-50 text-zinc-900 border-inherit data-focused:outline-inherit placeholder:text-zinc-500/95":
              theme == "sky",
          },
          {
            "bg-violet-50 text-zinc-800 border-purple-700 data-focused:outline-purple-700 placeholder:text-zinc-500/95":
              theme == "violet",
          }
        )}
      />
      <div className="flex items-start justify-end gap-2.5">
        <FormErrorMsgPopUp
          show={showError.show}
          type={showError.type}
          msg={showError.msg}
        />

        <FormButton theme={theme} onClick={validate}>
          OK
        </FormButton>
      </div>
    </section>
  );
};
