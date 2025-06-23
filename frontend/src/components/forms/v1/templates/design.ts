import { DesignState } from "@/store/forms/formV1Design";

export const designTemplate: DesignState[] = [
  {
    label: {
      size: "48px",
      family: '"Playfair Display", serif',
      color: "#d0021bff",
      italics: false,
      weight: "bold",
      letter_spacing: "0.025em",
    },
    description: {
      size: "20px",
      family: '"Lora", serif',
      color: "#d0021bff",
      italics: false,
      weight: "light",
      letter_spacing: "0em",
    },
    element: {
      variant: "solid",
      textColor: "#d0021bff",
      bgColor: "#fce7c7ff",
      borderColor: "#d0021bff",
    },
    layout: {
      elementSpacing: "12px",
      bgType: "solid",
      bgSolidValue: {
        color: "#f5dcb3ff",
      },
      bgImageValue: {
        imageUrl: "",
      },
      bgCustomValue: {
        value: "",
      },
    },
  },
];
