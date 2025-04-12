import { atom } from "nanostores";
interface Workspace {
  id: number;
  name: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export const $all_workspaces = atom<Workspace[]>([]);
