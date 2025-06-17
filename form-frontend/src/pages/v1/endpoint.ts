import axios from "axios";

export async function fetchUsers(formId: string, token: string): Promise<any> {
  const response = await axios.get<any>(`/api/form/${formId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
