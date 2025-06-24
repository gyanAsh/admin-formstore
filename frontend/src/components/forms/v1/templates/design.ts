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
      textAlign: "left",
      spread: true,
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
      textAlign: "center",
      spread: false,
      bgCustomValue: {
        value: "",
      },
      bgImageValue: {
        imageUrl: "",
      },
      bgSolidValue: {
        color: "#000000ff",
      },
      bgType: "solid",
      elementSpacing: "12px",
    },
  },
  {
    themeName: "Candy Cal Gradient",
    label: {
      size: "48px",
      family: '"Cal Sans", sans-serif',
      color: "#000000cf",
      italics: false,
      weight: "medium",
      letter_spacing: "0.025em",
    },
    description: {
      size: "20px",
      family: '"Roboto", sans-serif',
      color: "#000000cf",
      italics: false,
      weight: "normal",
      letter_spacing: "-0.025em",
    },
    element: {
      variant: "solid",
      textColor: "#000000cf",
      bgColor: "#f3d1f4",
      borderColor: "#000000cf",
    },
    layout: {
      textAlign: "left",
      spread: true,
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
  },
];
