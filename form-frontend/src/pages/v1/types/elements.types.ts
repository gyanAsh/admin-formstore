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
  address = "address",
  consent = "consent",
  multiselect = "multiselect",
  dropdown = "dropdown",
  singleSelect = "singleselect",
  ranking = "ranking",
  rating = "rating",
  text = "text",
  date = "date",
  long_text = "longtext",
  phone = "phone",
  email = "email",
  yesno = "boolean",
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
  | NumberValidation
  | DateValidation
  | AddressValidation;

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

export interface DateValidation {
  defaultValue: string; // - yyyy-mm-dd
  minValue: string; // - yyyy-mm-dd
  maxValue: string; // - yyyy-mm-dd
  activateMinMaxRange: boolean; // false
}

export interface ConsentValidation {
  acceptBtnText: string; //I accept
}

export interface AddressValidation {
  line1: {
    placeholder: string;
    show: boolean;
    required: boolean;
    label: string;
  };
  line2: {
    placeholder: string;
    show: boolean;
    required: boolean;
    label: string;
  };
  city: {
    placeholder: string;
    show: boolean;
    required: boolean;
    label: string;
  };
  state: {
    placeholder: string;
    show: boolean;
    required: boolean;
    label: string;
  };
  zip: {
    placeholder: string;
    show: boolean;
    required: boolean;
    label: string;
  };
  country: {
    placeholder: string;
    show: boolean;
    required: boolean;
    label: string;
  };
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
