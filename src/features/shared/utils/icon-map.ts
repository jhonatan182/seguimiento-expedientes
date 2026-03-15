import {
  IconFileWord,
  IconInnerShadowTop,
  IconListDetails,
} from "@tabler/icons-react";

export const iconMap = {
  IconFileWord,
  IconInnerShadowTop,
  IconListDetails,
} as const;

export type IconName = keyof typeof iconMap;
