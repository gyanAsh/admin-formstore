import { atom } from "nanostores";
interface Workspace {
  id: number;
  name: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export const $all_workspaces = atom<Workspace[]>([]);
export const $current_workspace = atom<Workspace>({
  id: 0,
  name: "Current Workspace",
  user_id: 0,
  created_at: "",
  updated_at: "",
});
