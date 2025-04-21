import { atom } from "nanostores";

interface FormElement {
  id: number;
  type: FromTypes;
}

export enum FromTypes {
  "default",
  "multiselect",
  "dropdown",
  "date",
  "text",
  "phone",
  "email",
}

export const $current_form_elements = atom<FormElement[]>([
  { id: 0, type: FromTypes.default },
]);
export function updateElementType(id: number, newType: FromTypes) {
  const current = $current_form_elements.get();
  const updated: FormElement[] = current.map((item) =>
    item.id === id ? { ...(item as FormElement), type: newType } : item
  );

  $current_form_elements.set(updated);
}
export const $active_form_element = atom<number>(0);
