import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Forms } from "../types/elements.types";

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
      design: {
        label: {
          size: "48px",
          family: '"IBM Plex Serif", serif',
          color: "#f2f7fcff",
          italics: false,
          weight: "bold",
          letter_spacing: "0.025em",
        },
        description: {
          size: "20px",
          family: '"IBM Plex Serif", serif',
          color: "#f2f7fcff",
          italics: true,
          weight: "light",
          letter_spacing: "-0.05em",
        },
        element: {
          variant: "solid",
          textColor: "#000000ff",
          bgColor: "#f2f7fcff",
          borderColor: "#000000ff",
        },
        layout: {
          elementSpacing: "8px",
          bgType: "custom",
          bgSolidValue: {
            color: "#000000ff",
          },
          bgImageValue: {
            imageUrl: "/bg/pink-abstract.jpg",
          },
          bgCustomValue: {
            value:
              "radial-gradient(at 64.60129310344827% 44.79166666666667%, #ccf62c 0px, transparent 50%),radial-gradient(at 77% 4%, #98c74e 0px, transparent 50%),radial-gradient(at 0% 94.09722169240315%, #60a261 0px, transparent 50%),radial-gradient(at 100% 100%, #357a5b 0px, transparent 50%),radial-gradient(at 100% 7.5%, #417505 0px, transparent 50%),#ccf62c",
          },
          textAlign: "center",
        },
      },
      setFormState: (state) => set({ ...state }),
    }),
    {
      name: "current_form", // unique name for storage
      // Use sessionStorage instead of the default localStorage
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
