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
import { RakingKey, RakingValue } from "./form-elemets.types";

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
