import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Forms } from "../types/elements.types";
import { ThemeValues } from "./values";

// interface BearState {
//   form_elements: {

//   };
//   increase: () => void;
//   removeAllBears: () => void;
// }

// Create a store with the persist middleware
export const useFormV1Store = create<Forms>()(
  persist(
    (set) => ({
      id: "",
      form_name: "",
      design: {
        theme: ThemeValues.luxe_minimal_noir.value,
        addGrainyBG: false,
        displayTwoColumns: false,
      },
      //   increase: () => set((state) => ({ form_elements: state.bears + 1 })),
      //   removeAllBears: () => set({ bears: 0 }),
    }),
    {
      name: "current_form", // unique name for storage
      // Use sessionStorage instead of the default localStorage
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
