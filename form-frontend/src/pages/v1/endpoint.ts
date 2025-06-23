import axios from "axios";

export async function fetchForm(formId: string): Promise<any> {
  const response = await axios.get<any>(`/api/published/form/${formId}`);
  return response.data;
}
