import { cn } from "@/lib/utils";
import { FormButton } from "../button";
import type { WelcomeValidation } from "../../types/elements.types";

export const FormWelcomeScreen = ({
  welcome,
  goNextFunction,
}: {
  welcome: WelcomeValidation;
  goNextFunction: Function;
}) => {
  return (
    <section className={cn(" max-w-150 flex flex-col gap-2.5 grow")}>
      <div className="grid  place-items-center gap-5">
        <FormButton
          className="w-fit"
          required={false}
          validateFunction={() => {}}
          goNextFunction={goNextFunction}
        >
          {welcome.btnText}
        </FormButton>
      </div>
    </section>
  );
};

export const FormExitScreen = ({
  goNextFunction,
}: {
  goNextFunction: Function;
}) => {
  return null;
  return (
    <section className={cn(" max-w-150 flex flex-col gap-2.5 grow")}>
      <div className="grid  place-items-center gap-5">
        <FormButton
          className="w-fit"
          required={false}
          validateFunction={() => {}}
          goNextFunction={goNextFunction}
        >
          Finish
        </FormButton>
      </div>
    </section>
  );
};
