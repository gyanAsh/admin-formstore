export interface FormDesignAttributes {
  color: FormColor;
  rounded: FontSizeNumber;
  layout: FormLayout;
  background?: {
    type: FormBackgroundTypes;
    path: string;
    direction: FormBackgroundDirection;
  };
  label: {
    font: FormFontFamily;
    size: FontSizeNumber;
  };
  description: {
    font: FormFontFamily;
    size: FontSizeNumber;
  };
}

export type ColorKey = FormColor;

export interface ColorValue {
  value: ColorKey;
  name: string;
}

export type FontFamilyKey = FormFontFamily;

export interface FontFamilyValue {
  value: FontFamilyKey;
  name: string;
}

//size = 4*size
export type FontSizeNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type FormLayout = "left" | "right" | "center";
export type FormColor = "noir" | "sky" | "violet" | "forest" | "trance_sky";
export type FormBackgroundDirection = "left" | "right" | "fill";
export type FormBackgroundTypes = "image" | "video";
export type FormFontFamily =
  | "Cal_San"
  | "Playfair_Display"
  | "IBM_Plex_Serif"
  | "Roboto";
export type FormFontFamilyDescription = "Cal_San";
