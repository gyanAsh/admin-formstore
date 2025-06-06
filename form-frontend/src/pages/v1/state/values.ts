import type { ThemeKey, ThemeValue } from "../types/design.types";

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
} from "lucide-react";

import type { RatingKey, RatingValue } from "../types/elements.types";

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

export const ThemeValues: Record<ThemeKey, ThemeValue> = {
  luxe_minimal_noir: {
    value: "luxe_minimal_noir",
    name: "Luxe Minimal - Noir",
  },
  gradient_forest: { value: "gradient_forest", name: "Gradient - Forest" },
  luxe_minimal_forest: {
    value: "luxe_minimal_forest",
    name: "Luxe Minimal - Forest",
  },
};
