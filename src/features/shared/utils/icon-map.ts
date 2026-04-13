import {
  IconFileWord,
  IconInnerShadowTop,
  IconListDetails,
  IconTransfer
} from "@tabler/icons-react";

export const iconMap = {
  IconFileWord,
  IconInnerShadowTop,
  IconListDetails,
  IconTransfer,
} as const;

export type IconName = keyof typeof iconMap;
