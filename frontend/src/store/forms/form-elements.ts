import { persistentAtom } from "@nanostores/persistent";
import { FormElements, Forms } from "./form-elemets.types";

export const $all_forms = persistentAtom<Forms[]>(
  "all_forms", // Key to store in localStorage
  [], // Default value
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

export function addForm(newForm: Forms) {
  const existingForms = $all_forms.get();
  const formExists = existingForms.some((form) => form.id === newForm.id);

  if (!formExists) {
    $all_forms.set([...existingForms, newForm]);
  }
}

export function deleteForm(formId: string) {
  $all_forms.set($all_forms.get().filter((form) => form.id !== formId));
}

export function setFormElements(formId: string, newElements: FormElements[]) {
  $all_forms.set(
    $all_forms.get().map((form) => {
      if (form.id === formId) {
        return {
          ...form,
          elements: newElements,
        };
      }
      return form;
    })
  );
}

export function addFormElement(formId: string, newElement: FormElements) {
  $all_forms.set(
    $all_forms.get().map((form) => {
      if (form.id === formId) {
        const updatedElements = form.elements
          ? [...form.elements, newElement]
          : [newElement];
        return {
          ...form,
          elements: updatedElements,
        };
      }
      return form;
    })
  );
}

export function removeFormElement(formId: string, elementId: string) {
  $all_forms.set(
    $all_forms.get().map((form) => {
      if (form.id === formId && form.elements) {
        return {
          ...form,
          elements: form.elements.filter((element) => element.id !== elementId),
        };
      }
      return form;
    })
  );
}
