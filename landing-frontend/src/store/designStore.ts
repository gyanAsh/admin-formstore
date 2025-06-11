// src/store/designStore.ts
// This file defines your Zustand store with TypeScript types and persistence.

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

// --- TypeScript Interfaces ---

// Define the interface for the label design properties
export interface LabelDesign {
  size: TextSize["value"];
  family: TextFont["value"];
  color: string;
  italics: boolean;
  weight: "light" | "normal" | "medium" | "bold"; // Specific string literal union for weight
}

// Define the interface for the description design properties
export interface DescriptionDesign {
  size: TextSize["value"];
  family: TextFont["value"];
  color: string;
  italics: boolean;
  weight: "light" | "normal" | "medium" | "bold";
}

// Define the overall state interface for the design properties
interface DesignState {
  labelDesign: LabelDesign;
  descriptionDesign: DescriptionDesign;
}

// Define the interface for the actions (functions) that modify the state
interface DesignStoreActions {
  // `Partial<LabelDesign>` allows updating only some properties of labelDesign
  setLabelDesign: (newLabelDesign: Partial<LabelDesign>) => void;
  // `Partial<DescriptionDesign>` allows updating only some properties of descriptionDesign
  setDescriptionDesign: (
    newDescriptionDesign: Partial<DescriptionDesign>
  ) => void;
}

// Combine the state and actions interfaces to define the full store type
type DesignStore = DesignState & DesignStoreActions;

// --- Default State ---

// Define the initial default state with type assertion
const defaultDesignState: DesignState = {
  labelDesign: {
    size: "60px",
    family: '"IBM Plex Sans", sans-serif',
    color: "#fff",
    italics: false,
    weight: "light",
  },
  descriptionDesign: {
    size: "20px",
    family: '"IBM Plex Serif", serif',
    color: "#fff",
    italics: true,
    weight: "light",
  },
};

// --- Zustand Store Creation ---

// Create the Zustand store using TypeScript types and middleware
export const useDesignStore = create<DesignStore>()(
  // `devtools` middleware provides integration with Redux DevTools Extension for debugging.
  // It should wrap `persist` to ensure all actions are logged.
  devtools(
    // `persist` middleware stores the state in `localStorage` (or other storage).
    persist(
      // The core store logic, similar to your original setup but with types.
      (set) => ({
        // Initialize the state with the default values.
        ...defaultDesignState,

        // Action to update the labelDesign part of the state.
        // It takes a partial object that will be merged with the current labelDesign.
        setLabelDesign: (newLabelDesign) =>
          set((state) => ({
            labelDesign: { ...state.labelDesign, ...newLabelDesign },
          })),

        // Action to update the descriptionDesign part of the state.
        // It takes a partial object that will be merged with the current descriptionDesign.
        setDescriptionDesign: (newDescriptionDesign) =>
          set((state) => ({
            descriptionDesign: {
              ...state.descriptionDesign,
              ...newDescriptionDesign,
            },
          })),
      }),
      {
        // Configuration for the `persist` middleware:
        name: "design-storage", // A unique string key for your storage item in localStorage
      }
    ),
    {
      name: "Design Store", // Name for the devtools instance
    }
  )
);

//---------Hardcoded values---------
//--Text-Size--//
export const textSizeLineHeight: Record<TextSize["value"], string> = {
  "16px": "calc(1.5 / 1)",
  "20px": "calc(1.75 / 1.25)",
  "30px": "calc(2.25 / 1.875)",
  "48px": "1",
  "60px": "1",
};
export const maxMdTextSize: Record<TextSize["value"], string> = {
  "60px": "48px",
  "48px": "30px",
  "30px": "20px",
  "20px": "16px",
  "16px": "16px",
};

export const maxSmTextSize: Record<TextSize["value"], string> = {
  "60px": "30px",
  "48px": "20px",
  "30px": "16px",
  "20px": "16px",
  "16px": "16px",
};
export interface TextSize {
  value: "16px" | "20px" | "30px" | "48px" | "60px";
  name: "sm" | "md" | "lg" | "xl" | "xxl";
}
export const textSizes: TextSize[] = [
  {
    value: "16px",
    name: "sm",
  },
  {
    value: "20px",
    name: "md",
  },
  {
    value: "30px",
    name: "lg",
  },
  {
    value: "48px",
    name: "xl",
  },
  {
    value: "60px",
    name: "xxl",
  },
];

//--Text-Fonts--//
export interface TextFont {
  value:
    | '"Cal Sans", sans-serif'
    | '"IBM Plex Serif", serif'
    | '"Roboto", sans-serif'
    | '"Playfair Display", serif'
    | '"Lora", serif'
    | '"IBM Plex Sans", sans-serif';
  label:
    | "Cal Sans"
    | "IBM Plex Serif"
    | "Roboto"
    | "Playfair Display"
    | "Lora"
    | "IBM Plex Sans";
}

export const textFonts: TextFont[] = [
  {
    value: '"Cal Sans", sans-serif',
    label: "Cal Sans",
  },
  {
    value: '"IBM Plex Serif", serif',
    label: "IBM Plex Serif",
  },
  {
    value: '"Roboto", sans-serif',
    label: "Roboto",
  },
  {
    value: '"Playfair Display", serif',
    label: "Playfair Display",
  },
  {
    value: '"Lora", serif',
    label: "Lora",
  },

  {
    value: '"IBM Plex Sans", sans-serif',
    label: "IBM Plex Sans",
  },
];
