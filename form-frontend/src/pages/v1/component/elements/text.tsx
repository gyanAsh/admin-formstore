import { cn } from "@/lib/utils";
import { FormButton } from "../button";
import { useEffect, useState } from "react";
import { useFormV1Store } from "../../state/design";
import useAutoFocusOnVisible from "@/hooks/use-autofocus-on-visible";
import { FormTypes, type TextValidation } from "../../types/elements.types";
import { toast } from "sonner";

export const FormText = ({
  text,
  seq_number,
  required,
  goNextFunction,
}: {
  text: TextValidation;
  required: Boolean;
  seq_number: number;
  goNextFunction: Function;
}) => {
  const [textState, setTextState] = useState("");
  const [showError, setShowError] = useState<{
    show: boolean;
    msg: string;
  }>({ msg: "", show: false });

  const { ref } = useAutoFocusOnVisible<HTMLInputElement>(0.2);

  const { element: elDesign } = useFormV1Store((state) => state.design);
  const updateValue = useFormV1Store((state) => state.updateInputState);
  const getInputBySeqNumber = useFormV1Store(
    (state) => state.getInputBySeqNumber
  );
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
    if (textState.length < text.minLength) {
      toast.warning("Text too short.");
      return;
    } else if (textState.length > text.maxLength) {
      toast.warning("Text too long.");
      return;
    }
    updateValue({
      seq_number: seq_number,
      value: textState,
      type: FormTypes.text,
    });
  };

  useEffect(() => {
    if (typeof seq_number === "number") {
      let oldinput = getInputBySeqNumber(seq_number);
      if (oldinput !== undefined) {
        setTextState(oldinput.value);
      }
    }
  }, [seq_number]);
  return (
    <section className={cn(" max-w-150 flex flex-col gap-2.5 grow")}>
      <input
        id="element-description"
        type="text"
        ref={ref}
        value={textState}
        onChange={(e) => {
          let val = e.target.value;
          setTextState(e.target.value);
          if (val.length > text.maxLength) {
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
        placeholder={text.placeholder}
        //   className="field-sizing-content max-h-29.5 min-h-0 resize-none py-1.75"
        className={cn(
          "w-full border-2 py-2.5 md:py-3 px-9 md:px-9.5 text-lg md:text-xl",
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

        <FormButton
          validateFunction={validate}
          required={required}
          goNextFunction={goNextFunction}
        >
          OK
        </FormButton>
      </div>
    </section>
  );
};
