import { FormTheme } from "./design-elements.types";
import { $all_forms } from "../form-elements";

export function setFormTheme(formId: string, theme: FormTheme) {
  $all_forms.set(
    $all_forms.get().map((form) => {
      if (form.id === formId) {
        return {
          ...form,
          design: { ...form.design, theme: theme },
        };
      }
      return form;
    })
  );
}
export function setBGNoise(formId: string, addNoise: boolean) {
  $all_forms.set(
    $all_forms.get().map((form) => {
      if (form.id === formId) {
        return {
          ...form,
          design: { ...form.design, addGrainyBG: addNoise },
        };
      }
      return form;
    })
  );
}

export function setTwoColumns(formId: string, addTwoCols: boolean) {
  $all_forms.set(
    $all_forms.get().map((form) => {
      if (form.id === formId) {
        return {
          ...form,
          design: { ...form.design, displayTwoColumns: addTwoCols },
        };
      }
      return form;
    })
  );
}
