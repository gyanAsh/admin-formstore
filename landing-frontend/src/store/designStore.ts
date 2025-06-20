import { validHex } from "@uiw/react-color";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  type LucideIcon,
} from "lucide-react";
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

export interface LayoutDesign {
  layoutAlign: LayoutAlign["value"];
  elementSpacing: Spacing["value"];
  bgType: BgType["type"];
  bgSolidValue?: SolidValueType;
  bgCustomValue?: CustomValueType;
  bgImageValue?: ImageValueType;
}

// Define the overall state interface for the design properties
export interface DesignState {
  labelDesign: LabelDesign;
  descriptionDesign: DescriptionDesign;
  elementDesign: ElementDesign;
  layoutDesign: LayoutDesign;
}

// Define the interface for the actions (functions) that modify the state : allows updating only some properties of Each-Design
interface DesignStoreActions {
  setDesign: (design: DesignState) => void;
  setLabelDesign: (newLabelDesign: Partial<LabelDesign>) => void;
  setDescriptionDesign: (
    newDescriptionDesign: Partial<DescriptionDesign>
  ) => void;
  setElementDesign: (newElementDesign: Partial<ElementDesign>) => void;
  setLayoutDesign: (newLayoutDesign: Partial<LayoutDesign>) => void;
}

// Combine the state and actions interfaces to define the full store type
type DesignStore = DesignState & DesignStoreActions;

// --- Default State ---

// Define the initial default state with type assertion
const defaultDesignState: DesignState = {
  labelDesign: {
    size: "48px",
    family: '"Cal Sans", sans-serif',
    color: "#000000cf",
    italics: false,
    weight: "medium",
    letter_spacing: "0.025em",
  },
  descriptionDesign: {
    size: "20px",
    family: '"Roboto", sans-serif',
    color: "#000000cf",
    italics: false,
    weight: "normal",
    letter_spacing: "-0.025em",
  },
  elementDesign: {
    variant: "solid",
    textColor: "#000000cf",
    bgColor: "#f3d1f4",
    borderColor: "#000000cf",
  },
  layoutDesign: {
    layoutAlign: "center",
    elementSpacing: "4px",
    bgType: "custom",
    bgSolidValue: { color: "#00a1559f" },
    bgImageValue: {
      imageUrl: "",
    },
    bgCustomValue: {
      value: `radial-gradient(at 28% 24%, #f3d1f4 0px, transparent 50%), radial-gradient(at 24% 39%, #f5fcc1 0px, transparent 50%), radial-gradient(at 100% 56%, #bae5e5 0px, transparent 50%), radial-gradient(at 16% 49%, #98d6ea 0px, transparent 50%), #f3d1f4`,
    },
  },
};

// --- Zustand Store Creation ---

export const useDesignStore = create<DesignStore>()(
  // `devtools` middleware provides integration with Redux DevTools Extension for debugging.
  devtools(
    (set) => ({
      // Initialize the state with the default values.
      ...defaultDesignState,
      setDesign: (design) => set(design),
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
      setLayoutDesign: (newLayoutDesign) =>
        set((state) => ({
          layoutDesign: { ...state.layoutDesign, ...newLayoutDesign },
        })),
    }),
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
  "30px": "25px",
  "20px": "20px",
  "16px": "16px",
};

export const maxSmTextSize: Record<TextSize["value"], string> = {
  "60px": "35px",
  "48px": "30px",
  "30px": "25px",
  "20px": "20px",
  "16px": "15px",
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

//--Spacing---//

export interface Spacing {
  value: "4px" | "8px" | "12px" | "16px" | "20px";
  name: "sm" | "md" | "lg" | "xl" | "xxl";
}

export const spacingSizes: Spacing[] = [
  {
    value: "4px",
    name: "sm",
  },
  {
    value: "8px",
    name: "md",
  },
  {
    value: "12px",
    name: "lg",
  },
  {
    value: "16px",
    name: "xl",
  },
  {
    value: "20px",
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

//---Letter Align---
export interface LayoutAlign {
  value: "left" | "center" | "right";
  icon: LucideIcon;
}

export const layoutAlignments: LayoutAlign[] = [
  {
    value: "left",
    icon: AlignLeft,
  },
  {
    value: "center",
    icon: AlignCenter,
  },
  {
    value: "right",
    icon: AlignRight,
  },
];

//--Align-Content--//
export const justifyContent: Record<LayoutAlign["value"], string> = {
  center: "center",
  left: "flex-start",
  right: "flex-end",
};

//--Background-Types--//
export interface SolidValueType {
  color: string;
}
export interface CustomValueType {
  value: string;
}
export interface ImageValueType {
  imageUrl: string;
}

// user can customize solid and image but custom is for template which can contain (linear/radial/mesh/patterns)
export interface BgType {
  type: "solid" | "custom" | "image";
  label: "Single Color" | "Custom" | "Image";
}

export const bgTypes: BgType[] = [
  {
    type: "solid",
    label: "Single Color",
  },
  {
    type: "image",
    label: "Image",
  },
];
