import { cn } from "@/lib/utils";
import { FormButton } from "../button";
import { useState } from "react";
import { useFormV1Store } from "../../state/design";
import useAutoFocusOnVisible from "@/hooks/use-autofocus-on-visible";
import type { LongTextValidation } from "../../types/elements.types";
import { toast } from "sonner";

export const FormLongText = ({
  long_text,
  goNextFunction,
}: {
  long_text: LongTextValidation;
  goNextFunction: Function;
}) => {
  const [textState, setTextState] = useState("");
  const [showError, setShowError] = useState<{
    show: boolean;
    msg: string;
  }>({ msg: "", show: false });

  const { ref } = useAutoFocusOnVisible<HTMLTextAreaElement>(0.2);

  const { element: elDesign } = useFormV1Store((state) => state.design);

  const elStyle: Record<string, string> & React.CSSProperties = {
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
    if (textState.length < long_text.minLength) {
      toast.warning("Text too short.");
      return;
    } else if (textState.length > long_text.maxLength) {
      toast.warning("Text too long.");
      return;
    }
    goNextFunction();
  };

  return (
    <section className={cn(" max-w-150 flex flex-col gap-2.5 grow")}>
      <textarea
        id="element-description"
        ref={ref}
        value={textState}
        onChange={(e) => {
          let val = e.target.value;
          setTextState(e.target.value);
          if (val.length > long_text.maxLength) {
            setShowError({ show: true, msg: "Text too long." });
          } else {
            setShowError((prev) => ({ ...prev, show: false }));
          }
        }}
        // onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        //   if (e.key === "Enter") {
        //     validate();
        //   }
        // }}
        placeholder={long_text.placeholder}
        //   className="field-sizing-content max-h-29.5 min-h-0 resize-none py-1.75"
        className={cn(
          "field-sizing-content min-h-10 md:min-h-14 resize-none w-full border-2 py-2.5 md:py-3 px-9 md:px-9.5 text-lg md:text-xl",
          "text-[var(--text-color)] [font-family:var(--input-family)] border-[var(--border-color)]/60 placeholder:text-[var(--text-color)]/65 outline-0 focus:border-[var(--border-color)] w-full h-fit py-2 px-4 text-lg rounded-[25px] md:rounded-[28px] font-medium placeholder:italic bg-[var(--bg-color)]/[var(--transparant)]",
          { " backdrop-blur-xs": elDesign.variant === "glass" }
        )}
        style={elStyle}
      />
      <div className="flex items-start justify-end gap-2.5">
        <div
          className={cn(
            "h-full flex items-center justify-center text-center transition-all duration-500 translate-y-0",
            {
              "opacity-0  -translate-y-3": !showError.show,
            }
          )}
        >
          <p className="text-yellow-600 bg-yellow-100/95 text-base p-2 rounded-lg  backdrop-blur-2xl ">
            {showError.msg}
          </p>
        </div>

        <FormButton onClick={validate}>OK</FormButton>
      </div>
    </section>
  );
};
