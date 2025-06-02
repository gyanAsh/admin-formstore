import { persistentAtom } from "@nanostores/persistent";
import { FormTheme, FormDesignAttributes } from "./design-elements.types";

export const $form_design_atts = persistentAtom<FormDesignAttributes>(
  "form_design_atts", // Key to store in localStorage
  {
    theme: "luxe_minimal_noir",
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
