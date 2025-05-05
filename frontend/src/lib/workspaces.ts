import { getAuthToken } from "@/lib/utils";

type Workspace = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

async function getWorkspaces() {
  console.count("get_workspace");
  const res = await fetch(`/api/workspaces`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data as Workspace[];
}

export { getWorkspaces };

export type { Workspace };
