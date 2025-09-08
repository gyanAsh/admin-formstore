import { cn, delay } from "@/lib/utils";
import { useFormV1Store } from "../state/design";
import { useParams } from "react-router";

export const FormButton = ({
  className,
  required,
  validateFunction,
  goNextFunction,
  text,
  ...props
}: React.ComponentProps<"button"> & {
  validateFunction: Function;
  required: Boolean;
  goNextFunction: Function;
  text?: String;
}) => {
  const { element: elDesign, button: btnDesign } = useFormV1Store(
    (state) => state.design,
  );

  const { formId } = useParams();

  const isLastElement = useFormV1Store((state) => state.isLastElement);
  const userInputState = useFormV1Store((state) => state.inputState);
  const buttonDesign = btnDesign || elDesign;
  const elStyle: Record<string, string> & React.CSSProperties = {
    "--text-color": buttonDesign.textColor,
    "--bg-color": buttonDesign.bgColor,
    "--border-color": buttonDesign.borderColor,
    "--transparant":
      buttonDesign.variant === "glass"
        ? "20%"
        : buttonDesign.variant === "outline"
          ? "0%"
          : "100%",
  };
  const validateGoNext = () => {
    try {
      if (!!required) {
        validateFunction();
        if (!!isLastElement) {
          runSubmitFunction().then(() => goNextFunction());
        } else delay(300).then(() => goNextFunction());
      } else {
        goNextFunction();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const runSubmitFunction = async () => {
    fetch(`/api/published/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public_id: formId,
        elements: userInputState
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
    console.log({ userInputState });
  };

  return (
    <button
      className={cn(
        " min-w-25  md:min-w-[160px] w-fit  zdisabled:grayscale-100",
        " px-2.5 md:px-3 py-2.5 md:py-3 cursor-pointer",
        " hover:contrast-75 hover:scale-[1.02] active:scale-95 duration-200 transition-colors",

        "rounded-full text-[var(--text-color)] [font-family:var(--input-family)] text-lg bg-[var(--bg-color)]/[var(--transparant)] border-2 border-[var(--border-color)] hover:text-[var(--text-color)] hover:bg-[var(--bg-color)]/[var(--transparant)]",
        { " backdrop-blur-[1px]": elDesign.variant === "glass" },
        className,
      )}
      id="validateGoNext"
      style={elStyle}
      onClick={validateGoNext}
      {...props}
    >
      {text ? text : isLastElement ? "Submit" : "Next"}
    </button>
  );
};
