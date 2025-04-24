import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";

interface FormElement {
  id: number;
  type: FormTypes;
}

export enum FormTypes {
  "default",
  "multiselect",
  "dropdown",
  "date",
  "text",
  "phone",
  "email",
}

export const $current_form_elements = persistentAtom<FormElement[]>(
  "form_elements", // Key to store in localStorage
  [{ id: 0, type: FormTypes.default }], // Default value
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

export function updateElementType(id: number, newType: FormTypes) {
  const current = $current_form_elements.get();
  const updated = current.map((item) =>
    item.id === id ? { ...item, type: newType } : item
  );
  $current_form_elements.set(updated);
}

export function addNewElement() {
  const current = $current_form_elements.get();
  const newElement = { id: current.length, type: FormTypes.default };
  $current_form_elements.set([...current, newElement]);
}

export function removeExistingElement(id: number) {
  const current = $current_form_elements.get();
  const updated = current.filter((item) => item.id !== id);
  $current_form_elements.set(updated);
}
export const $active_form_element = atom<number>(0);
