import { persistentAtom } from "@nanostores/persistent";
import {
  FormColor,
  FormDesignAttributes,
  FormFontFamily,
} from "./design-elements.types";

export const $form_design_atts = persistentAtom<FormDesignAttributes>(
  "form_design_atts", // Key to store in localStorage
  {
    color: "noir",
    rounded: 3,
    layout: "center",
    label: {
      font: "Cal_San",
      size: 7,
    },
    description: {
      font: "Cal_San",
      size: 3,
    },
  }, // Default value
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

export function setFormColor(color: FormColor) {
  const current = $form_design_atts.get();
  $form_design_atts.set({
    ...current,
    color: color,
  });
}

export function setFormLabelFamily(font_family: FormFontFamily) {
  const current = $form_design_atts.get();
  $form_design_atts.set({
    ...current,
    label: { ...current.label, font: font_family },
  });
}
export function setFormDescriptionFamily(font_family: FormFontFamily) {
  const current = $form_design_atts.get();
  $form_design_atts.set({
    ...current,
    description: { ...current.description, font: font_family },
  });
}
