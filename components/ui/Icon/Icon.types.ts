import { icons } from './icons';

export const IconColorValues = [
  'primary',
  'primaryInverse',
  'secondary',
  'disabled',
  'accent',
  'accentHover',
  'accentActive',
  'accentSubdued',
  'accentSubduedHover',
  'accentSubduedActive',
  'progress',
  'progressHover',
  'progressActive',
  'progressSubdued',
  'progressSubduedHover',
  'progressSubduedActive',
  'critical',
  'criticalHover',
  'criticalActive',
  'caution',
  'cautionHover',
  'cautionActive',
  'success',
  'successHover',
  'successActive',
] as const;

export type IconColorType = (typeof IconColorValues)[number];

export type IconType = keyof typeof icons;
export type IconsType = typeof icons;

export type IconSizeType = 'xsmall' | 'small' | 'medium' | 'large' | 'xlLarge' | 'landing';

export type IconProps = {
  icon: IconType;
  color?: IconColorType;
  size?: IconSizeType;
  className?: string;
  onClick?: () => void;
};
