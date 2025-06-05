import { persistentAtom } from "@nanostores/persistent";
import { FormTheme, FormDesignAttributes } from "./design-elements.types";
import { ThemeValues } from "./values";

export const $form_design_atts = persistentAtom<FormDesignAttributes>(
  "form_design_atts", // Key to store in localStorage
  {
    theme: ThemeValues.luxe_minimal_noir.value,
    addGrainyBG: false,
    displayTwoColumns: false,
  }, // Default value
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

export function setFormTheme(theme: FormTheme) {
  const current = $form_design_atts.get();
  $form_design_atts.set({
    ...current,
    theme: theme,
  });
}

export function setBGNoise(noice: boolean) {
  const current = $form_design_atts.get();
  $form_design_atts.set({
    ...current,
    addGrainyBG: noice,
  });
}

export function setTwoColumns(twoColumns: boolean) {
  const current = $form_design_atts.get();
  $form_design_atts.set({
    ...current,
    displayTwoColumns: twoColumns,
  });
}
