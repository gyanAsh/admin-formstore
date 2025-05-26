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

import { FormFields, RakingKey, RakingValue } from "./form-elemets.types";

export const RakingValues: Record<RakingKey, RakingValue> = {
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
      { title: "Rating", icon: Star, isPremium: false },
      {
        title: "Ranking",
        value: FormFields.ranking,
        icon: ListOrdered,
        isPremium: true,
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
