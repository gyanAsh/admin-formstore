import type { LucideIcon } from "lucide-react";
import type { DesignState, FormDesignAttributes } from "./design.types";

export interface Forms {
  id: string;
  title: string;
  updated_at: string;
  created_at: string;
  elements: FormElements[];
  design: FormDesignAttributes & DesignState;
}

export type FormElements = {
  id: string;
  sequence_number?: number;
  type: string;
  label: string;
  description: string;
  required?: boolean;
  properties?: ValidatonTypes;
};

export type RatingKey =
  | "star"
  | "heart"
  | "thumb_up"
  | "thumb_down"
  | "crown"
  | "lightning"
  | "skull"
  | "check"
  | "wrong"
  | "pizza";

export interface RatingValue {
  value: RatingKey;
  name: string;
  icon: LucideIcon;
}

export type ValidatonTypes =
  | EmailValidation
  | ConsentValidation
  | UrlValidation
  | TextValidation
  | RatingValidation;

// Specific validation rules for each field type
export interface EmailValidation {
  placeholder: string; //example@email.com
}

export interface UrlValidation {
  placeholder: string; //https://
}

export interface ConsentValidation {
  acceptBtnText: string; //I accept
  rejectBtnText: string; //I don't accept
}

export interface RatingValidation {
  iconLength: 5; //5
  ratingIcon: RatingKey; //star
}

export interface TextValidation {
  placeholder: string; //Add text here
  minLength: number; //1
  maxLength: number; //150
}
