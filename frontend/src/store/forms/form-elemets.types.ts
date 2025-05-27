import type { LucideIcon } from "lucide-react";

export interface Forms {
  id: string;
  workspaceId: string;
  form_name: string;
  elements?: FormElements[];
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
  required: boolean;
  validations?: ValidatonTypes;
};

export enum FormFields {
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
  minLength: number; //1
  maxLength: number; //150
}
