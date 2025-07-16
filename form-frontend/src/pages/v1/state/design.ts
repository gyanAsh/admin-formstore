import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Forms } from "../types/elements.types";
import { defaultDesignState } from "../types/design.types";

interface DesignStoreActions {
  setFormState: (design: Forms) => void;
  // setLabelDesign: (newLabelDesign: Partial<LabelDesign>) => void;
}

// Combine the state and actions interfaces to define the full store type
type FormStore = Forms & DesignStoreActions;
// Create a store with the persist middleware
export const useFormV1Store = create<FormStore>()(
  persist(
    (set) => ({
      id: "",
      title: "",
      elements: [],
      design: defaultDesignState,
      setFormState: (state) => set({ ...state }),
    }),
    {
      name: "current_form", // unique name for storage
      // Use sessionStorage instead of the default localStorage
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
