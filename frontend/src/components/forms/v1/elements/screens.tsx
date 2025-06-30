import { cn } from "@/lib/utils";
import { FormButton } from "../button";
import { WelcomeValidation } from "@/store/forms/form-elements.types";

export const FormWelcomeScreen = ({
  welcome,
  goNextFunction,
}: {
  welcome: WelcomeValidation;
  goNextFunction: Function;
}) => {
  const validate = () => {
    goNextFunction();
  };

  return (
    <section className={cn(" max-w-150 flex flex-col gap-2.5 grow")}>
      <div className="grid  place-items-center gap-5">
        <FormButton className="w-fit" onClick={validate}>
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
  const validate = () => {
    goNextFunction();
  };
  return null;
  return (
    <section className={cn(" max-w-150 flex flex-col gap-2.5 grow")}>
      <div className="grid  place-items-center gap-5">
        <FormButton className="w-fit" onClick={validate}>
          Finish
        </FormButton>
      </div>
    </section>
  );
};
