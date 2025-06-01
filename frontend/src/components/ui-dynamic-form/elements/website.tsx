import { cn } from "@/lib/utils";
import {
  FormColor,
  FormFontFamily,
} from "@/store/designs/design-elements.types";
import { UrlValidation } from "@/store/forms/form-elemets.types";
import { Input } from "react-aria-components";
import { FormButton } from "../button";
import { FormErrorMsgPopUp } from "../error-card";
import { useState } from "react";
import { z } from "zod";

const urlSchema = z
  .string()
  .url({ message: "Please enter a valid URL, eg: https:// or http://" });

export const FormWebsite = ({
  family,
  url,
  theme,
  goNextFunction,
}: {
  url: UrlValidation;
  family: FormFontFamily;
  theme: FormColor;
  goNextFunction: Function;
}) => {
  const [inputState, setInputState] = useState("");
  const [showError, setShowError] = useState<{
    show: boolean;
    msg: string;
    type: "warn" | "error";
  }>({ show: false, msg: "", type: "error" });
  const validate = () => {
    const result = urlSchema.safeParse(inputState);
    if (!result.success) {
      setShowError({
        show: true,
        msg: result.error.errors.at(0)?.message!,
        type: "error",
      });
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
      <Input
        type="url"
        className={cn(
          "w-full border-2 py-2 md:py-3 px-3 md:px-4.5 ",
          { "text-lg md:text-xl": "size" === "size" },

          {
            "bg-green-50 text-zinc-900 border-emerald-500 data-focused:outline-emerald-500 placeholder:text-zinc-500/75":
              theme === "forest",
          },
          {
            "bg-blue-50 text-zinc-900 border-inherit data-focused:outline-inherborder-inherit placeholder:text-zinc-500/95":
              theme === "trance_sky",
          },
          { "text-zinc-300": theme == "noir" },
          {
            "bg-blue-50 text-zinc-900 border-inherit data-focused:outline-inherborder-inherit placeholder:text-zinc-500/95":
              theme == "sky",
          },
          { "text-zinc-800": theme == "violet" }
        )}
        autoFocus
        placeholder={url.placeholder}
        formNoValidate
        value={inputState}
        onChange={(e) => {
          setShowError((prev) => ({ ...prev, show: false }));
          setInputState(e.target.value);
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            validate();
          }
        }}
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
