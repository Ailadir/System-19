import { JSX } from 'react';

export type TextHeaderVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8' | 'h9';
export type TextParagraphVariants = 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6';
export type TextVariant = TextHeaderVariants | TextParagraphVariants;

export type TextWeight = 'light' | 'regular';

export type TextColor =
  | 'primary'
  | 'secondary'
  | 'disabled'
  | 'accent'
  | 'accentHover'
  | 'accentActive'
  | 'progress'
  | 'progressHover'
  | 'progressActive'
  | 'critical'
  | 'criticalHover'
  | 'criticalActive'
  | 'caution'
  | 'cautionHover'
  | 'cautionActive'
  | 'success'
  | 'successHover'
  | 'successActive'
  | 'white';

export const variantTagMap: Record<TextVariant, keyof JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  h7: 'h6',
  h8: 'h6',
  h9: 'h6',
  p1: 'p', //24px
  p2: 'p', //18px
  p3: 'p', //16px
  p4: 'p', //14px
  p5: 'p', //12px
  p6: 'p', //10px
};

export type ClampTextType = 1 | 2 | 3;
type SemanticType =
  | 'landing'
  | 'snippet'
  | 'footer'
  | 'chat'
  | 'magazine'
  | 'header'
  | 'profile'
  | 'tag'
  | 'lightSnippet'
  | 'search'
  | 'rules'
  | 'banner';

export type TextProps =
  | {
      variant: TextParagraphVariants;
      weight?: TextWeight;
      color?: TextColor;
      children: React.ReactNode;
      className?: string;
      id?: string;
      clamp?: ClampTextType;
      semanticType?: SemanticType;
    }
  | {
      variant: TextHeaderVariants;
      color?: TextColor;
      children: React.ReactNode;
      className?: string;
      id?: string;
      clamp?: ClampTextType;
      semanticType?: SemanticType;
    };
