import type { LucideIcon } from "lucide-react";
import type { DesignState } from "./design.types";

export interface Forms {
  id: string;
  title: string;
  elements: FormElements[];
  design: DesignState;
}

export type FormElements = {
  seq_number?: number;
  type: Partial<FormTypes>;
  // type:  FormTypes;
  label: string;
  description: string;
  required?: boolean;
  properties?: ValidatonTypes;
};

export enum FormTypes {
  welcome = "welcome",
  exit = "exit",
  url = "website",
  consent = "consent",
  multiselect = "multiselect",
  dropdown = "dropdown",
  ranking = "ranking",
  rating = "rating",
  date = "date",
  text = "text",
  phone = "phone",
  email = "email",
}
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
  | RatingValidation
  | WelcomeValidation;

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

export interface WelcomeValidation {
  btnText: string; //https://
}
