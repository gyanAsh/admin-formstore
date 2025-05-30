import {
  ColorKey,
  ColorValue,
  FontFamilyKey,
  FontFamilyValue,
} from "./design-elements.types";

export const ColorValues: Record<ColorKey, ColorValue> = {
  noir: { value: "noir", name: "Noir" },
  sky: { value: "sky", name: "Arctic" },
  violet: { value: "violet", name: "grade-purple" },
  trance_sky: { value: "trance_sky", name: "Trance Sky" },
  forest: { value: "forest", name: "Forest" },
};

export const FontFamilyValues: Record<FontFamilyKey, FontFamilyValue> = {
  Cal_San: { value: "Cal_San", name: "Cal San" },
  Playfair_Display: { value: "Playfair_Display", name: "Playfair Display" },
  IBM_Plex_Serif: { value: "IBM_Plex_Serif", name: "IBM Plex Serif" },
  Roboto: { value: "Roboto", name: "Roboto" },
};
