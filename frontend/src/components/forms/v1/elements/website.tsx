import { cn } from "@/lib/utils";
import { UrlValidation } from "@/store/forms/form-elements.types";
import { Input } from "react-aria-components";
import { FormButton } from "../button";
import { FormErrorMsgPopUp } from "../error-card";
import { useState } from "react";
import { z } from "zod";
import useAutoFocusOnVisible from "@/hooks/use-autofocus-on-visible";
import { useStore } from "@nanostores/react";
import {
  $get_design_element,
  $get_design_label,
} from "@/store/forms/form-elements";

const urlSchema = z
  .string()
  .url({ message: "Please enter a valid URL, eg: https:// or http://" });

export const FormWebsite = ({
  url,
  goNextFunction,
}: {
  url: UrlValidation;
  goNextFunction: Function;
}) => {
  const [inputState, setInputState] = useState("");
  const [showError, setShowError] = useState<{
    show: boolean;
    msg: string;
    type: "warn" | "error";
  }>({ show: false, msg: "", type: "error" });

  const { ref } = useAutoFocusOnVisible<HTMLInputElement>(0.5);

  const elDesign = useStore($get_design_element);
  const design = useStore($get_design_label);
  const elStyle: Record<string, string> & React.CSSProperties = {
    "--family": design.family,
    "--text-color": elDesign.textColor,
    "--bg-color": elDesign.bgColor,
    "--border-color": elDesign.borderColor,
    "--transparant":
      elDesign.variant === "glass"
        ? "20%"
        : elDesign.variant === "outline"
        ? "0%"
        : "100%",
  };

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
    <section className={cn(" max-w-150 flex flex-col gap-2.5 grow")}>
      <Input
        type="url"
        id="url-element"
        className={cn(
          "w-full border-2 py-2 md:py-3 px-3 md:px-4.5 text-lg md:text-xl",

          "text-[var(--text-color)] [font-family:var(--family)] border-[var(--border-color)]/60 placeholder:text-[var(--text-color)]/65 outline-0 focus:border-[var(--border-color)] w-full h-fit py-2 px-4 text-lg rounded-full font-medium placeholder:italic bg-[var(--bg-color)]/[var(--transparant)]",
          { " backdrop-blur-xs": elDesign.variant === "glass" }
        )}
        style={elStyle}
        ref={ref}
        // autoFocus={true}
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

        <FormButton onClick={validate}>OK</FormButton>
      </div>
    </section>
  );
};
