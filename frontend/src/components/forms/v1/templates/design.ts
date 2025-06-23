import { DesignState } from "@/store/forms/formV1Design";

type Tempate = DesignState & { themeName: string };
export const designTemplate: Tempate[] = [
  {
    themeName: "Red Playfair - Wide",
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
  {
    themeName: "Black Plex Serif",
    description: {
      color: "#f2f7fcff",
      family: '"IBM Plex Serif", serif',
      italics: false,
      letter_spacing: "-0.05em",
      size: "30px",
      weight: "light",
    },
    element: {
      bgColor: "#ffffffff",
      borderColor: "#ffffffff",
      textColor: "#000000ff",
      variant: "solid",
    },
    label: {
      color: "#f2f7fcff",
      family: '"IBM Plex Serif", serif',
      italics: false,
      letter_spacing: "0.025em",
      size: "60px",
      weight: "bold",
    },
    layout: {
      bgCustomValue: {
        value:
          "radial-gradient(at 64.60129310344827% 44.79166666666667%, #ccf62c 0px, transparent 50%),\n                 radial-gradient(at 77% 4%, #98c74e 0px, transparent 50%),\n                 radial-gradient(at 0% 94.09722169240315%, #60a261 0px, transparent 50%),\n                 radial-gradient(at 100% 100%, #357a5b 0px, transparent 50%),\n                 radial-gradient(at 100% 7.5%, #417505 0px, transparent 50%),\n                 #ccf62c",
      },
      bgImageValue: {
        imageUrl: "/bg/pink-abstract.jpg",
      },
      bgSolidValue: {
        color: "#000000ff",
      },
      bgType: "solid",
      elementSpacing: "12px",
    },
  },
];
