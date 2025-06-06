import { cn } from "@/lib/utils";
import { FormTheme } from "@/store/forms/designs/design-elements.types";
import { TextValidation } from "@/store/forms/form-elements.types";
import { TextArea } from "react-aria-components";
import { FormButton } from "../button";
import { useState } from "react";
import { FormErrorMsgPopUp } from "../error-card";
import { ThemeValues } from "@/store/forms/designs/values";
import useAutoFocusOnVisible from "@/hooks/use-autofocus-on-visible";

export const FormText = ({
  text,
  theme,
  goNextFunction,
}: {
  text: TextValidation;
  theme: FormTheme;
  goNextFunction: Function;
}) => {
  const [textState, setTextState] = useState("");
  const [showError, setShowError] = useState<{
    show: boolean;
    msg: string;
    type: "warn" | "error";
  }>({ show: false, msg: "", type: "error" });

  const { ref } = useAutoFocusOnVisible<HTMLTextAreaElement>(0.2);

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
          {
            " autofill:!bg-transparent !bg-green-900/20 text-white rounded-4xl border-zinc-50 data-focused:outline-zinc-50 placeholder:text-zinc-200/80":
              theme === ThemeValues.gradient_forest.value,
          },
          {
            "bg-zinc-950/35 text-zinc-300 rounded-4xl border-zinc-400 data-focused:outline-zinc-300 placeholder:text-zinc-600":
              theme == ThemeValues.luxe_minimal_noir.value,
          },
          {
            " autofill:!bg-transparent !bg-green-900/10 text-inherit rounded-4xl border-green-500 data-focused:outline-green-600 placeholder:text-green-900/55":
              theme === ThemeValues.luxe_minimal_forest.value,
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
