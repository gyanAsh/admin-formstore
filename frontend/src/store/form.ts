import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import { generateMicroId } from "@/lib/utils";

export interface FormElement {
  id: string;
  type: FormTypes;
}

export enum FormTypes {
  default = "default",
  multiselect = "multiselect",
  dropdown = "dropdown",
  date = "date",
  text = "text",
  phone = "phone",
  email = "email",
}

export const $current_form_elements = persistentAtom<FormElement[]>(
  "form_elements", // Key to store in localStorage
  [{ id: generateMicroId(8), type: FormTypes.default }], // Default value
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

export function updateElementType(id: string, newType: FormTypes) {
  const current = $current_form_elements.get();
  const updated = current.map((item) =>
    item.id === id ? { ...item, type: newType } : item
  );
  $current_form_elements.set(updated);
}

export function addNewElement() {
  const current = $current_form_elements.get();
  const newElement = { id: generateMicroId(8), type: FormTypes.default };
  $current_form_elements.set([...current, newElement]);
}

export function removeExistingElement(id: string) {
  const current = $current_form_elements.get();
  const updated = current.filter((item) => item.id !== id);
  $current_form_elements.set(updated);
}

export const $active_form_element = atom<number>(0);

export interface FormStyles {
  layout: "page" | "list";
}

export const $form_styles = persistentAtom<FormStyles>(
  "form_styles",
  { layout: "list" },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);
