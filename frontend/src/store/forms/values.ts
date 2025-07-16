import {
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Crown,
  Zap,
  Skull,
  Check,
  X,
  Pizza,
  AlignLeft,
  CircleCheck,
  CircleUser,
  FileText,
  Gauge,
  LayoutList,
  Link2,
  ListOrdered,
  Mail,
  MapPinned,
  Phone,
  SquareCheck,
  Table,
  GalleryHorizontalEnd,
  List,
  LucideIcon,
  Handshake,
  ChevronDown,
  Hash,
} from "lucide-react";

import {
  AddressValidation,
  ConsentValidation,
  DropdownValidation,
  EmailValidation,
  FormElements as FormElementType,
  FormFields,
  MultiSelectValidation,
  NumberValidation,
  PhoneValidation,
  RankingValidation,
  RatingKey,
  RatingValidation,
  RatingValue,
  SingleSelectValidation,
  TextValidation,
  UrlValidation,
  ValidatonTypes,
  WelcomeValidation,
  YesNoValidation,
} from "./form-elements.types";
import { generateMicroId } from "@/lib/utils";

export const RatingValues: Record<RatingKey, RatingValue> = {
  star: { value: "star", name: "Start", icon: Star },
  heart: { value: "heart", name: "Heart", icon: Heart },
  thumb_up: { value: "thumb_up", name: "Thumb Up", icon: ThumbsUp },
  thumb_down: { value: "thumb_down", name: "Thumb Down", icon: ThumbsDown },
  crown: { value: "crown", name: "Crown", icon: Crown },
  lightning: { value: "lightning", name: "Lightning", icon: Zap },
  skull: { value: "skull", name: "Skull", icon: Skull },
  check: { value: "check", name: "Check", icon: Check },
  wrong: { value: "wrong", name: "Cross", icon: X },
  pizza: { value: "pizza", name: "Food", icon: Pizza },
};

export const FormElements = [
  {
    name: "Contact Info",
    color: "pink",
    items: [
      { title: "Contact Info", icon: CircleUser, isPremium: true },
      {
        title: "Email",
        value: FormFields.email,
        icon: Mail,
        isPremium: false,
      },
      {
        title: "Address",
        icon: MapPinned,
        isPremium: false,
        value: FormFields.address,
      },
      {
        title: "Phone",
        icon: Phone,
        isPremium: false,
        value: FormFields.phone,
      },
      {
        title: "Website",
        value: FormFields.url,
        icon: Link2,
        isPremium: false,
      },
    ],
  },
  {
    name: "Choice",
    color: "blue",
    items: [
      {
        title: "Multiple Select",
        icon: LayoutList,
        isPremium: false,
        value: FormFields.multiselect,
      },
      // {
      //   title: "Dropdown",
      //   icon: ChevronDown,
      //   isPremium: false,
      //   value: FormFields.dropdown,
      // },
      {
        title: "Single Select",
        icon: List,
        isPremium: false,
        value: FormFields.singleSelect,
      },
      {
        title: "Yes/No",
        icon: CircleCheck,
        isPremium: false,
        value: FormFields.yesno,
      },
      {
        title: "Concent",
        value: FormFields.consent,
        icon: SquareCheck,
        isPremium: false,
      },
    ],
  },
  {
    name: "Rating & Ranking",
    color: "green",
    items: [
      {
        title: "Net Promoter Score®",
        icon: Gauge,
        isPremium: false,
        value: FormFields.nps,
      },
      {
        title: "Rating",
        value: FormFields.rating,
        icon: Star,
        isPremium: false,
      },
      {
        title: "Ranking",
        icon: ListOrdered,
        isPremium: false,
        value: FormFields.ranking,
      },
      { title: "Matrix", icon: Table, isPremium: true },
    ],
  },
  {
    name: "Text & Number",
    color: "yellow",
    items: [
      {
        title: "Paragraph Text",
        icon: FileText,
        isPremium: false,
        value: FormFields.long_text,
      },
      {
        title: "Short Text",
        value: FormFields.text,
        icon: AlignLeft,
        isPremium: false,
      },
      {
        title: "Number",
        value: FormFields.number,
        icon: Hash,
        isPremium: false,
      },
      // { title: "Video", icon: Play, isPremium: true },
    ],
  },
  {
    name: "Others",
    color: "gray",
    items: [
      {
        title: "Welcome Screen",
        value: FormFields.welcome,
        icon: GalleryHorizontalEnd,
        isPremium: false,
      },
      {
        title: "Exit Screen",
        value: FormFields.exit,
        icon: GalleryHorizontalEnd,
        isPremium: false,
      },
    ],
  },
];

export function getDefaultLabelTitle(fieldType: string): string {
  switch (fieldType) {
    case FormFields.email:
      return "Email Address...";
    case FormFields.url:
      return "Website's Link...";
    case FormFields.phone:
      return "Phone...";
    case FormFields.text:
      return "Write...";
    case FormFields.address:
      return "Address...";
    case FormFields.long_text:
      return "Write Paragraph...";
    case FormFields.consent:
      return "I accept...";
    case FormFields.number:
      return "Number...";
    case FormFields.rating:
      return "Rate...";
    case FormFields.yesno:
      return "Yes or No...";
    case FormFields.singleSelect:
      return "Select Single...";
    case FormFields.multiselect:
      return "Select Multi...";
    case FormFields.nps:
      return "Net Promoter Score...";
    case FormFields.ranking:
      return "Ranking...";
    case FormFields.dropdown:
      return "Dropdown...";
    case FormFields.welcome:
      return "Welcome!👋 We're glad you're here.";
    case FormFields.exit:
      return "You're all set! 🎉Thanks for taking the time to complete the form.";
    default:
      return "Unknown Field";
  }
}

export function getBadgeValue(fieldValue: string): FormElementType["badge"] {
  switch (fieldValue) {
    case FormFields.email:
      return { value: "Email", color: "pink" };
    case FormFields.url:
      return { value: "Website", color: "pink" };
    case FormFields.address:
      return { value: "Address", color: "pink" };
    case FormFields.consent:
      return { value: "Consent", color: "blue" };
    case FormFields.yesno:
      return { value: "Yes/No", color: "blue" };
    case FormFields.phone:
      return { value: "Phone", color: "blue" };
    case FormFields.singleSelect:
      return { value: "Single Select", color: "blue" };
    case FormFields.multiselect:
      return { value: "Multi Select", color: "blue" };
    case FormFields.dropdown:
      return { value: "Dropdown", color: "blue" };
    case FormFields.rating:
      return { value: "Rating", color: "green" };
    case FormFields.nps:
      return { value: "Net Promoter Score", color: "green" };
    case FormFields.ranking:
      return { value: "Ranking", color: "green" };
    case FormFields.text:
      return { value: "Text", color: "yellow" };
    case FormFields.long_text:
      return { value: "Paragraph Text", color: "yellow" };
    case FormFields.number:
      return { value: "Number", color: "yellow" };
    case FormFields.welcome:
      return { value: "Welcome", color: "gray" };
    case FormFields.exit:
      return { value: "Exit", color: "gray" };
    default:
      return { value: "new", color: "gray" };
  }
}

export function getDefaultValidations(
  fieldType: string
): ValidatonTypes | undefined {
  switch (fieldType) {
    case FormFields.email:
      return {
        placeholder: "example@gmail.com",
      } as EmailValidation;
    case FormFields.url:
      return {
        placeholder: "https://",
      } as UrlValidation;
    case FormFields.phone:
      return {
        placeholder: "+1 234 567 890",
      } as PhoneValidation;
    case FormFields.number:
      return {
        placeholder: "42",
      } as NumberValidation;
    case FormFields.text:
      return {
        minLength: 1,
        maxLength: 150,
        placeholder: "Add your text here...",
      } as TextValidation;
    case FormFields.long_text:
      return {
        minLength: 1,
        maxLength: 1000,
        placeholder: "Add your text here...",
      } as TextValidation;
    case FormFields.address:
      return {
        line1: {
          placeholder: "Enter your Address Line 1",
          show: true,
          required: true,
          label: "Address Line 1",
        },
        line2: {
          placeholder: "Enter your Address Line 2",
          show: true,
          required: true,
          label: "Address Line 2",
        },
        city: {
          placeholder: "Enter your City Address",
          show: true,
          required: true,
          label: "City",
        },
        state: {
          placeholder: "Enter your State Address",
          show: true,
          required: true,
          label: "State",
        },
        zip: {
          placeholder: "Enter your Address' Zip Code",
          show: true,
          required: true,
          label: "Zip Code",
        },
        country: {
          placeholder: "Enter your Country",
          show: true,
          required: true,
          label: "Country",
        },
      } as AddressValidation;
    case FormFields.consent:
      return {
        acceptBtnText: "I accept",
      } as ConsentValidation;
    case FormFields.yesno:
      return {
        yesBtnText: "Yes",
        noBtnText: "No",
      } as YesNoValidation;
    case FormFields.dropdown:
      return {
        defaultText: "Select the options..",
        dropdownOptions: [{ id: generateMicroId(), text: "Option 1" }],
      } as DropdownValidation;
    case FormFields.singleSelect:
      return {
        options: [{ id: generateMicroId(), text: "Option 1" }],
      } as SingleSelectValidation;
    case FormFields.multiselect:
      return {
        options: [{ id: generateMicroId(), text: "Option 1" }],
      } as MultiSelectValidation;
    case FormFields.nps:
      return undefined;
    case FormFields.ranking:
      return {
        options: [{ id: generateMicroId(), text: "Option 1" }],
      } as RankingValidation;
    case FormFields.rating:
      return {
        iconLength: 5,
        ratingIcon: "star",
      } as RatingValidation;
    case FormFields.welcome:
      return {
        btnText: "Get Started",
      } as WelcomeValidation;
    default:
      undefined;
  }
}

export const smallTextLimits = {
  hardMinValue: 1,
  hardMaxValue: 255,
};

export const largeTextLimits = {
  hardMinValue: 1,
  hardMaxValue: 3000,
};

export const FormElementIcon: Record<
  FormFields,
  {
    title: string;
    icon: LucideIcon;
    color: "pink" | "blue" | "green" | "yellow" | "gray";
  }
> = {
  [FormFields.email]: {
    title: "Email",
    icon: Mail,
    color: "pink",
  },
  [FormFields.address]: {
    title: "Address",
    icon: MapPinned,
    color: "pink",
  },
  [FormFields.number]: {
    title: "Number",
    icon: Hash,
    color: "yellow",
  },
  [FormFields.phone]: {
    title: "Phone",
    icon: Phone,
    color: "pink",
  },

  [FormFields.text]: {
    title: "Text",
    icon: AlignLeft,
    color: "yellow",
  },
  [FormFields.long_text]: {
    title: "Paragraph Text",
    icon: FileText,
    color: "yellow",
  },
  [FormFields.dropdown]: {
    title: "Dropdown",
    icon: ChevronDown,
    color: "blue",
  },
  [FormFields.multiselect]: {
    title: "Multi-select",
    icon: LayoutList,
    color: "blue",
  },
  [FormFields.singleSelect]: {
    title: "Single Select",
    icon: List,
    color: "blue",
  },
  [FormFields.ranking]: {
    title: "Ranking",
    icon: ListOrdered,
    color: "green",
  },
  [FormFields.rating]: {
    title: "Rating",
    icon: Star,
    color: "green",
  },
  [FormFields.url]: {
    title: "Website URL",
    icon: Link2,
    color: "pink",
  },
  [FormFields.consent]: {
    title: "Consent",
    icon: Handshake,
    color: "green",
  },
  [FormFields.nps]: {
    title: "Net Promoter Score",
    icon: Gauge,
    color: "green",
  },
  [FormFields.yesno]: {
    title: "Yes / No",
    icon: CircleCheck,
    color: "blue",
  },
  [FormFields.welcome]: {
    title: "",
    icon: GalleryHorizontalEnd,
    color: "gray",
  },
  [FormFields.exit]: {
    title: "",
    icon: GalleryHorizontalEnd,
    color: "gray",
  },
};
