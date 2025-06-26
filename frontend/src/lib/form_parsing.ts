import { Forms } from "@/store/forms/form-elements.types";

export function parseFormDataForApi(formData: Forms, formId: number) {
  const retFormData = {
    form_id: formId,
    design: formData.design,
    elements: formData.elements.map((x, i) => ({
      seq_num: i + 1,
      type: x.field,
      labels: x.labels,
      required: x.required,
      validations: {},
      properties: x.validations,
    })),
  };
  return retFormData;
}

