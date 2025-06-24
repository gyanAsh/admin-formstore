export async function fetchForm(formId: string): Promise<any> {
  const res = await fetch(`/api/published/form/${formId}`);
  return res.json();
}
