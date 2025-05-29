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
    font: FormFont;
    size: FontSizeNumber;
  };
  description: {
    font: FormFont;
    size: FontSizeNumber;
  };
}

export type ColorKey = FormColor;

export interface ColorValue {
  value: ColorKey;
  name: string;
}

//size = 4*size
export type FontSizeNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type FormLayout = "left" | "right" | "center";
export type FormColor = "noir" | "sky";
export type FormBackgroundDirection = "left" | "right" | "fill";
export type FormBackgroundTypes = "image" | "video";
export type FormFont = "Cal_San";
export type FormFontDescription = "Cal_San";
