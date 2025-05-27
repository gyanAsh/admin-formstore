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
} from "lucide-react";

import {
  ConsentValidation,
  EmailValidation,
  FormFields,
  RatingKey,
  RatingValidation,
  RatingValue,
  TextValidation,
  UrlValidation,
  ValidatonTypes,
} from "./form-elemets.types";

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

export const FromElements = [
  {
    name: "Contact Info",
    color: "pink",
    items: [
      { title: "Contact Info", icon: CircleUser, isPremium: false },
      {
        title: "Email",
        value: FormFields.email,
        icon: Mail,
        isPremium: true,
      },
      { title: "Address", icon: MapPinned, isPremium: false },
      { title: "Phone", icon: Phone, isPremium: false },
      {
        title: "Website",
        value: FormFields.url,
        icon: Link2,
        isPremium: true,
      },
    ],
  },
  {
    name: "Choice",
    color: "blue",
    items: [
      { title: "Multiple Choice", icon: LayoutList, isPremium: false },
      { title: "Dropdown", icon: ChevronDown, isPremium: false },
      { title: "Yes/No", icon: CircleCheck, isPremium: false },
      {
        title: "Concent",
        value: FormFields.consent,
        icon: SquareCheck,
        isPremium: true,
      },
      { title: "Checkbox", icon: Link2, isPremium: false },
    ],
  },
  {
    name: "Rating & Ranking",
    color: "green",
    items: [
      { title: "Net Promoter Score®", icon: Gauge, isPremium: false },
      {
        title: "Rating",
        value: FormFields.rating,
        icon: Star,
        isPremium: true,
      },
      {
        title: "Ranking",
        icon: ListOrdered,
        isPremium: false,
      },
      { title: "Matrix", icon: Table, isPremium: false },
    ],
  },
  {
    name: "Text & Video",
    color: "yellow",
    items: [
      { title: "Long Text", icon: FileText, isPremium: false },
      {
        title: "Short Text",
        value: FormFields.text,
        icon: AlignLeft,
        isPremium: true,
      },
      { title: "Video", icon: Play, isPremium: true },
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
    default:
      return "Unknown Field";
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
    default:
      undefined;
  }
}
