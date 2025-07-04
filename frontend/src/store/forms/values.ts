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
  ChevronDown,
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
  Play,
  SquareCheck,
  Table,
  GalleryHorizontalEnd,
} from "lucide-react";

import {
  ConsentValidation,
  EmailValidation,
  FormElements as FormElementType,
  FormFields,
  RatingKey,
  RatingValidation,
  RatingValue,
  TextValidation,
  UrlValidation,
  ValidatonTypes,
  WelcomeValidation,
} from "./form-elements.types";

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
      { title: "Address", icon: MapPinned, isPremium: true },
      { title: "Phone", icon: Phone, isPremium: true },
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
      { title: "Multiple Choice", icon: LayoutList, isPremium: true },
      { title: "Dropdown", icon: ChevronDown, isPremium: true },
      { title: "Yes/No", icon: CircleCheck, isPremium: true },
      {
        title: "Concent",
        value: FormFields.consent,
        icon: SquareCheck,
        isPremium: false,
      },
      { title: "Checkbox", icon: Link2, isPremium: true },
    ],
  },
  {
    name: "Rating & Ranking",
    color: "green",
    items: [
      { title: "Net Promoter Score®", icon: Gauge, isPremium: true },
      {
        title: "Rating",
        value: FormFields.rating,
        icon: Star,
        isPremium: false,
      },
      {
        title: "Ranking",
        icon: ListOrdered,
        isPremium: true,
      },
      { title: "Matrix", icon: Table, isPremium: true },
    ],
  },
  {
    name: "Text & Video",
    color: "yellow",
    items: [
      { title: "Long Text", icon: FileText, isPremium: true },
      {
        title: "Short Text",
        value: FormFields.text,
        icon: AlignLeft,
        isPremium: false,
      },
      { title: "Video", icon: Play, isPremium: true },
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
      return "Phone Number...";
    case FormFields.text:
      return "Write...";
    case FormFields.consent:
      return "I accept...";
    case FormFields.rating:
      return "Rate...";
    case FormFields.welcome:
      return "Welcome!👋 We're glad you're here.";
    case FormFields.exit:
      return "You're all set! 🎉Thanks for taking the time to complete the form.";
    default:
      return "Unknown Field";
  }
}

export function getBadgeValue(fieldValue: string): FormElementType["badge"] {
  if ([FormFields.email, FormFields.url].some((e) => e === fieldValue)) {
    return { value: fieldValue, color: "pink" };
  } else if ([FormFields.consent].some((e) => e === fieldValue)) {
    return { value: fieldValue, color: "blue" };
  } else if ([FormFields.rating].some((e) => e === fieldValue)) {
    return { value: fieldValue, color: "green" };
  } else if ([FormFields.text].some((e) => e === fieldValue)) {
    return { value: fieldValue, color: "yellow" };
  } else if (
    [FormFields.welcome, FormFields.exit].some((e) => e === fieldValue)
  ) {
    return { value: fieldValue, color: "gray" };
  } else {
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
    case FormFields.text:
      return {
        minLength: 1,
        maxLength: 150,
        placeholder: "Add your text here...",
      } as TextValidation;
    case FormFields.consent:
      return {
        acceptBtnText: "I accept",
        rejectBtnText: "I don't accept",
      } as ConsentValidation;
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
