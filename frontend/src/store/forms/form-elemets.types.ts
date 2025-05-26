import type { LucideIcon } from "lucide-react";

export interface Forms {
  id: string;
  form_name: string;
  elements?: FormElements[];
}

export type FormElements = {
  id: string;
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
  date = "date",
  text = "text",
  phone = "phone",
  email = "email",
}

export type RakingKey =
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

export interface RakingValue {
  value: string;
  name: string;
  icon: LucideIcon;
}

export type ValidatonTypes =
  | EmailValidation
  | ConsentValidation
  | UrlValidation;

// Specific validation rules for each field type
export interface EmailValidation {
  pattern?: string; // e.g., regex pattern for custom email validation
  minLength?: number;
  maxLength?: number;
}

export interface UrlValidation {
  pattern?: string; // e.g., regex pattern for custom URL validation
  protocols?: string[]; // e.g., ['http', 'https']
}

export interface ConsentValidation {
  acceptCondition?: boolean; // e.g., whether the checkbox must be checked
}
