import { atom } from "nanostores";

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

export const $current_form_elements = atom<FormElement[]>([
  { id: 0, type: FormTypes.default },
]);
export function updateElementType(id: number, newType: FormTypes) {
  const current = $current_form_elements.get();
  const updated: FormElement[] = current.map((item) =>
    item.id === id ? { ...(item as FormElement), type: newType } : item
  );

  $current_form_elements.set(updated);
}

export function addNewElement() {
  const current = $current_form_elements.get();
  $current_form_elements.set([
    ...current,
    { id: current.length, type: FormTypes.default },
  ]);
}
export const $active_form_element = atom<number>(0);
