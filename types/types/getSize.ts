import { type ButtonSizeType } from '@/shared/ui/Button';
import { type ContainerBorderRadiusType } from '@/shared/ui/Container/Container.types';
import { type IconSizeType } from '@/shared/ui/Icon';
import { type TextHeaderVariants, type TextParagraphVariants } from '@/shared/ui/Text';

export type BreakpointType = 'mobile' | 'tablet' | 'desktop' | 'wideDesktop';

export type TitleGetSizeType = {
  titleSize: TextHeaderVariants;
};

export type TextGetSizeType = {
  textSize: TextParagraphVariants;
};

export type CombinedTextGetSizeType = TitleGetSizeType & TextGetSizeType;

export type ButtonGetSizeType = {
  buttonSize: ButtonSizeType;
  buttonTextSize: TextParagraphVariants;
};

export type BorderGetSizeType = {
  borderRadius: ContainerBorderRadiusType;
};

export type IconGetSizeType = {
  iconSize: IconSizeType;
};
