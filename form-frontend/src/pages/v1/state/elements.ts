// export const $all_forms = persistentAtom<Forms[]>(
//   "all_forms", // Key to store in localStorage
//   [], // Default value
//   {
//     encode: JSON.stringify,
//     decode: JSON.parse,
//   }
// );

// export function addForm(newForm: Forms) {
//   const existingForms = $all_forms.get();
//   const formExists = existingForms.some((form) => form.id === newForm.id);

//   if (!formExists) {
//     $all_forms.set([...existingForms, newForm]);
//   }
// }
