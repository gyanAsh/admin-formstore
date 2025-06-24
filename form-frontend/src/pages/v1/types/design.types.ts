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
export interface DesignState {
  label: LabelDesign;
  description: DescriptionDesign;
  element: ElementDesign;
  layout: LayoutDesign;
}

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

//--Text-Size--//
export interface TextSize {
  value: "16px" | "20px" | "30px" | "48px" | "60px";
  name: "sm" | "md" | "lg" | "xl" | "xxl";
}
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

//--------------defalut-value-------------

export const defaultDesignState: DesignState = {
  label: {
    size: "48px",
    family: '"IBM Plex Serif", serif',
    color: "#f2f7fcff",
    italics: false,
    weight: "bold",
    letter_spacing: "-0.05em",
  },
  description: {
    size: "20px",
    family: '"IBM Plex Serif", serif',
    color: "#f2f7fcff",
    italics: true,
    weight: "light",
    letter_spacing: "0em",
  },
  element: {
    variant: "glass",
    textColor: "#ffffffff",
    bgColor: "#f2f7fcff",
    borderColor: "#ffffffff",
  },
  layout: {
    elementSpacing: "12px",
    textAlign: "right",
    bgType: "image",
    bgSolidValue: { color: "#000000" },
    bgImageValue: { imageUrl: "/bg/pink-abstract.jpg" },
    bgCustomValue: {
      value: `radial-gradient(at 64.60129310344827% 44.79166666666667%, #ccf62c 0px, transparent 50%),
                 radial-gradient(at 77% 4%, #98c74e 0px, transparent 50%),
                 radial-gradient(at 0% 94.09722169240315%, #60a261 0px, transparent 50%),
                 radial-gradient(at 100% 100%, #357a5b 0px, transparent 50%),
                 radial-gradient(at 100% 7.5%, #417505 0px, transparent 50%),
                 #ccf62c`,
    },
  },
};

// ------------------------------------Layout-----------------------------------------

export interface LayoutDesign {
  elementSpacing: Spacing["value"];
  bgType: BgType["type"];
  bgSolidValue: SolidValueType;
  bgCustomValue: CustomValueType;
  bgImageValue: ImageValueType;
  textAlign: "left" | "center" | "right";
  spread?: boolean;
}

//--Spacing---//

export interface Spacing {
  value: "4px" | "8px" | "12px" | "16px" | "20px";
  name: "sm" | "md" | "lg" | "xl" | "xxl";
}

//---Letter Align---

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
