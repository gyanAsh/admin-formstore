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
  number = "number",
  nps = "nps",
  consent = "consent",
  multiselect = "multiselect",
  dropdown = "dropdown",
  singleSelect = "singleSelect",
  ranking = "ranking",
  rating = "rating",
  text = "text",
  long_text = "long_text",
  phone = "phone",
  email = "email",
  yesno = "yesno",
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
  | WelcomeValidation
  | YesNoValidation
  | SingleSelectValidation
  | MultiSelectValidation
  | PhoneValidation
  | NumberValidation;

// Specific validation rules for each field type
export interface EmailValidation {
  placeholder: string; //example@email.com
}

export interface UrlValidation {
  placeholder: string; //https://
}

export interface PhoneValidation {
  placeholder: string; //+12345678
}

export interface NumberValidation {
  placeholder: string; //42
}

export interface ConsentValidation {
  acceptBtnText: string; //I accept
}

export interface YesNoValidation {
  yesBtnText: string; //Yes
  noBtnText: string; //No
}

export interface SingleSelectValidation {
  options: {
    id: string;
    text: string;
  }[];
}

export interface MultiSelectValidation {
  options: {
    id: string;
    text: string;
  }[];
}

export interface RankingValidation {
  options: {
    id: string;
    text: string;
  }[];
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

export interface LongTextValidation {
  placeholder: string; //Add text here
  minLength: number; //1
  maxLength: number; //150
}

export interface WelcomeValidation {
  btnText: string; //https://
}
