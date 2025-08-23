import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Forms, FormTypes } from "../types/elements.types";
import { defaultDesignState } from "../types/design.types";

type Input = {
  seq_number: number;
  value: any;
  type: Partial<FormTypes>;
};

interface DesignStoreActions {
  setFormState: (design: Forms) => void;
  updateInputState: (data: Input) => void;
  getInputBySeqNumber: (data: number) => Input | undefined;
}

interface UserFormInput {
  inputState: Input[];
}

// Combine the state and actions interfaces to define the full store type
type FormStore = Forms & UserFormInput & DesignStoreActions;
// Create a store with the persist middleware
export const useFormV1Store = create<FormStore>()(
  (set, get) => ({
    id: "",
    title: "",
    elements: [],
    design: defaultDesignState,
    inputState: [],

    // Main function to update input state based on seq_number
    updateInputState: (newElement) =>
      set((state) => {
        const currentArray = [...state.inputState];
        const existingIndex = currentArray.findIndex(
          (element) => element.seq_number === newElement.seq_number,
        );

        if (existingIndex !== -1) {
          // Update existing element
          currentArray[existingIndex] = newElement;
        } else {
          // Add new element
          currentArray.push(newElement);
        }

        // Sort array by seq_number to maintain order
        currentArray.sort((a, b) => a.seq_number - b.seq_number);

        return { inputState: currentArray };
      }),
    getInputBySeqNumber: (seqNumber) => {
      const { inputState } = get();
      return inputState.find(
        (element: Input) => element.seq_number === seqNumber,
      );
    },
    setFormState: (state) => set((prev) => ({ ...prev, ...state })),
  }),
  {
    name: "current_form", // unique name for storage
    // Use sessionStorage instead of the default localStorage
    storage: createJSONStorage(() => sessionStorage),
  },
);
