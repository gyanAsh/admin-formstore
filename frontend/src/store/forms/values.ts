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
  star: { value: "star", icon: Star },
  heart: { value: "heart", icon: Heart },
  thumb_up: { value: "thumb_up", icon: ThumbsUp },
  thumb_down: { value: "thumb_down", icon: ThumbsDown },
  crown: { value: "crown", icon: Crown },
  lighting: { value: "lighting", icon: Zap },
  skull: { value: "skull", icon: Skull },
  check: { value: "check", icon: Check },
  wrong: { value: "wrong", icon: X },
  pizza: { value: "pizza", icon: Pizza },
};
