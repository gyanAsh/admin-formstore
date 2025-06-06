import { cn } from "@/lib/utils";
import { FormTheme } from "@/store/forms/designs/design-elements.types";
import { EmailValidation } from "@/store/forms/form-elements.types";
import { Input } from "react-aria-components";
import { FormButton } from "../button";
import { FormErrorMsgPopUp } from "../error-card";
import { useState } from "react";
import { z } from "zod";
import { ThemeValues } from "@/store/forms/designs/values";
import useAutoFocusOnVisible from "@/hooks/use-autofocus-on-visible";

const emailSchema = z.string().email({ message: "Invalid email address" });

export const FormEmail = ({
  email,
  theme,
  goNextFunction,
}: {
  email: EmailValidation;
  theme: FormTheme;
  goNextFunction: Function;
}) => {
  const [inputState, setInputState] = useState("");
  const [showError, setShowError] = useState<{
    show: boolean;
    msg: string;
    type: "warn" | "error";
  }>({ show: false, msg: "", type: "error" });
  const { ref } = useAutoFocusOnVisible<HTMLInputElement>(0.5);

  const validate = () => {
    const result = emailSchema.safeParse(inputState);
    if (!result.success) {
      setShowError({
        show: true,
        msg: result.error.errors.at(0)?.message!,
        type: "warn",
      });
      return;
    }
    goNextFunction();
  };

  return (
    <section className={cn(" max-w-150 flex flex-col gap-2.5 grow")}>
      <Input
        type="email"
        id="email-element"
        className={cn(
          "w-full border-2 py-2 md:py-3 px-3 md:px-4.5 text-lg md:text-xl",
          {
            " autofill:!bg-transparent !bg-green-900/20 text-white rounded-4xl border-zinc-50 data-focused:outline-zinc-50 placeholder:text-zinc-200/80":
              theme === ThemeValues.gradient_forest.value,
          },
          {
            " autofill:!bg-transparent !bg-green-900/10 text-inherit rounded-4xl border-green-500 data-focused:outline-green-600 placeholder:text-green-900/55":
              theme === ThemeValues.luxe_minimal_forest.value,
          },
          {
            "bg-zinc-950/35 text-zinc-300 rounded-4xl border-zinc-400 data-focused:outline-zinc-300 placeholder:text-zinc-600":
              theme == ThemeValues.luxe_minimal_noir.value,
          }
        )}
        ref={ref}
        placeholder={email.placeholder}
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
