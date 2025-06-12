import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

// --- TypeScript Interfaces ---

// Define the interface for the label design properties
export interface LabelDesign {
  size: TextSize["value"];
  family: TextFont["value"];
  color: string;
  italics: boolean;
  weight: "light" | "normal" | "medium" | "bold";
  letter_spacing: LetterSpacing["value"];
}

export interface DescriptionDesign {
  size: TextSize["value"];
  family: TextFont["value"];
  color: string;
  italics: boolean;
  weight: "light" | "normal" | "medium" | "bold";
  letter_spacing: LetterSpacing["value"];
}

export interface ElementDesign {
  variant: "solid" | "outline" | "glass";
  textColor: string;
  bgColor: string;
  borderColor: string;
}

// Define the overall state interface for the design properties
interface DesignState {
  labelDesign: LabelDesign;
  descriptionDesign: DescriptionDesign;
  elementDesign: ElementDesign;
}

// Define the interface for the actions (functions) that modify the state : allows updating only some properties of Each-Design
interface DesignStoreActions {
  setLabelDesign: (newLabelDesign: Partial<LabelDesign>) => void;
  setDescriptionDesign: (
    newDescriptionDesign: Partial<DescriptionDesign>
  ) => void;
  setElementDesign: (newElementDesign: Partial<ElementDesign>) => void;
}

// Combine the state and actions interfaces to define the full store type
type DesignStore = DesignState & DesignStoreActions;

// --- Default State ---

// Define the initial default state with type assertion
const defaultDesignState: DesignState = {
  labelDesign: {
    size: "60px",
    family: '"IBM Plex Sans", sans-serif',
    color: "#ffffff",
    italics: false,
    weight: "light",
    letter_spacing: "-0.025em",
  },
  descriptionDesign: {
    size: "20px",
    family: '"IBM Plex Serif", serif',
    color: "#ffffff",
    italics: true,
    weight: "light",
    letter_spacing: "0em",
  },
  elementDesign: {
    variant: "glass",
    textColor: "#ffffff",
    bgColor: "#ffffff",
    borderColor: "#ffffff",
  },
};

// --- Zustand Store Creation ---

export const useDesignStore = create<DesignStore>()(
  // `devtools` middleware provides integration with Redux DevTools Extension for debugging.
  devtools(
    persist(
      (set) => ({
        // Initialize the state with the default values.
        ...defaultDesignState,
        setLabelDesign: (newLabelDesign) =>
          set((state) => ({
            labelDesign: { ...state.labelDesign, ...newLabelDesign },
          })),
        setDescriptionDesign: (newDescriptionDesign) =>
          set((state) => ({
            descriptionDesign: {
              ...state.descriptionDesign,
              ...newDescriptionDesign,
            },
          })),
        setElementDesign: (newElementDesign) =>
          set((state) => ({
            elementDesign: { ...state.elementDesign, ...newElementDesign },
          })),
      }),
      {
        // Configuration for the `persist` middleware: A unique string key for your storage item in localStorage
        name: "design-storage",
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
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
  "48px": "36px",
  "30px": "20px",
  "20px": "18px",
  "16px": "16px",
};

export const maxSmTextSize: Record<TextSize["value"], string> = {
  "60px": "36px",
  "48px": "24px",
  "30px": "20px",
  "20px": "18px",
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

//---Letter Spacing---
export interface LetterSpacing {
  value: "-0.05em" | "-0.025em" | "0em" | "0.025em" | "0.1em";
  name: "Tight" | "Tighter" | "Normal" | "Wide" | "Wider";
}

export const letterSpacings: LetterSpacing[] = [
  {
    value: "-0.05em",
    name: "Tighter",
  },
  {
    value: "-0.025em",
    name: "Tight",
  },

  {
    value: "0.025em",
    name: "Wide",
  },
  {
    value: "0.1em",
    name: "Wider",
  },
];
