import { cn } from "@/lib/utils";
import { TextValidation } from "@/store/forms/form-elements.types";
import { TextArea } from "react-aria-components";
import { FormButton } from "../button";
import { useState } from "react";
import { FormErrorMsgPopUp } from "../error-card";
import useAutoFocusOnVisible from "@/hooks/use-autofocus-on-visible";
import { useStore } from "@nanostores/react";
import {
  $get_design_element,
  $get_design_label,
} from "@/store/forms/form-elements";

export const FormText = ({
  text,
  goNextFunction,
}: {
  text: TextValidation;
  goNextFunction: Function;
}) => {
  const [textState, setTextState] = useState("");
  const [showError, setShowError] = useState<{
    show: boolean;
    msg: string;
    type: "warn" | "error";
  }>({ show: false, msg: "", type: "error" });

  const { ref } = useAutoFocusOnVisible<HTMLTextAreaElement>(0.2);

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
    <section className={cn(" max-w-150 flex flex-col gap-2.5 grow")}>
      <TextArea
        id="element-description"
        ref={ref}
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
        placeholder={text.placeholder}
        //   className="field-sizing-content max-h-29.5 min-h-0 resize-none py-1.75"
        className={cn(
          "field-sizing-content min-h-14 resize-none w-full border-2 py-2.5 md:py-3 px-3 md:px-4.5 text-lg md:text-xl",
          "text-[var(--text-color)] [font-family:var(--family)] border-[var(--border-color)]/60 placeholder:text-[var(--text-color)]/65 outline-0 focus:border-[var(--border-color)] w-full h-fit py-2 px-4 text-lg rounded-full font-medium placeholder:italic bg-[var(--bg-color)]/[var(--transparant)]",
          { " backdrop-blur-xs": elDesign.variant === "glass" }
        )}
        style={elStyle}
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
