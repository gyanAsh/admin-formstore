import type { LucideIcon } from "lucide-react";
import { DesignState } from "./formV1Design";

export interface Forms {
  id: string;
  workspaceId: string;
  form_name: string;
  elements: FormElements[];
  updatedAt: Date;
  design: DesignState;
}

export type FormElements = {
  id: string;
  sequence_number?: number;
  field: string;
  badge?: {
    value: string;
    color: string;
  };
  labels: {
    title: string;
    description: string;
  };
  ref_img_file?: string;
  required: boolean;
  validations?: ValidatonTypes;
};

export enum FormFields {
  welcome = "welcome",
  exit = "exit",
  url = "website",
  number = "number",
  nps = "nps",
  address = "address",
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
  | DropdownValidation
  | SingleSelectValidation
  | MultiSelectValidation
  | PhoneValidation
  | NumberValidation
  | AddressValidation;

// Specific validation rules for each field type
export interface EmailValidation {
  placeholder: string; //example@email.com
}

export interface UrlValidation {
  placeholder: string; //https://
}

export interface PhoneValidation {
  placeholder: string; //+1 234 567 890
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
export interface NumberValidation {
  placeholder: string; //42
}

export interface ConsentValidation {
  acceptBtnText: string; //I accept
}

export interface DropdownValidation {
  defaultText: string;
  dropdownOptions: {
    id: string;
    text: string;
  }[];
}

export interface SingleSelectValidation {
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
export interface MultiSelectValidation {
  options: {
    id: string;
    text: string;
  }[];
}

export interface YesNoValidation {
  yesBtnText: string; //Yes
  noBtnText: string; //No
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
  maxLength: number; //300
}

export interface WelcomeValidation {
  btnText: string; //https://
}
