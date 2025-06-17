export interface FormDesignAttributes {
  theme: FormTheme;
}

export type ThemeKey = FormTheme;

export interface ThemeValue {
  value: ThemeKey;
  name: string;
}

export type FormTheme =
  | "luxe_minimal_noir"
  | "luxe_minimal_forest"
  | "gradient_forest";
