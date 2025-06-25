import { persistentAtom } from "@nanostores/persistent";
import { FormElements, Forms } from "./form-elements.types";
import { atom, computed } from "nanostores";
import { defaultDesignState } from "./formV1Design";

export const $all_forms = persistentAtom<Forms[]>(
  "all_forms", // Key to store in localStorage
  [], // Default value
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

let defaultCurrentForm: Forms = {
  id: "",
  workspaceId: "",
  form_name: "",
  updatedAt: new Date(0),
  elements: [],
  design: defaultDesignState,
};
// Selected workspace and form ID : these IDs should not be persisted cos it'll cause wrong form to show when user previews mulitple-froms
export const selectedWorkspaceId = atom<string | undefined>(
  // "selected-workspace-id",
  undefined,
);
export const selectedFormId = atom<string | undefined>(
  // "selected-form-id",
  undefined,
);

// Computed store to get current form
export const $current_form = computed(
  [$all_forms, selectedWorkspaceId, selectedFormId],
  (allForms, workspaceId, formId) => {
    if (!workspaceId || !formId) return defaultCurrentForm;
    return (
      allForms.find(
        (form) => form.workspaceId === workspaceId && form.id === formId,
      ) || defaultCurrentForm
    );
  },
);
export const $get_design_label = computed($current_form, (e) => e.design.label);

export const $get_design_description = computed(
  $current_form,
  (e) => e.design.description,
);
export const $get_design_element = computed(
  $current_form,
  (e) => e.design.element,
);
export const $get_design_layout = computed(
  $current_form,
  (e) => e.design.layout,
);

// ------------------- Actions-------------------
export function addFormIfNotExists(newForm: Forms) {
  const existingForms = $all_forms.get();
  const formExists = existingForms.some((form) => form.id === newForm.id);

  if (!formExists) {
    $all_forms.set([...existingForms, newForm]);
  }
}

export function updateForm(newForm: Forms) {
  const existingForms = $all_forms.get();
  const form = existingForms.find((form) => form.id === newForm.id);

  if (form) {
    if (form.updatedAt < newForm.updatedAt) {
      $all_forms.set(
        existingForms.map((fr) => {
          if (fr.id == newForm.id) {
            return newForm;
          }
          return fr;
        }),
      );
    }
  } else {
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
          updatedAt: new Date(),
          elements: newElements,
        };
      }
      return form;
    }),
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
    }),
  );
}
export function updateFormElement(
  formId: string,
  updatedElement: FormElements,
) {
  $all_forms.set(
    $all_forms.get().map((form) => {
      if (form.id === formId) {
        return {
          ...form,
          elements: form.elements?.map((e) =>
            e.id === updatedElement.id ? updatedElement : e,
          ),
        };
      }
      return form;
    }),
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
    }),
  );
}
