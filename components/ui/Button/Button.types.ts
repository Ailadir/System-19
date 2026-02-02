import { IconColorType, IconType } from '../Icon';
import { TextVariant } from '../Text';

export const ButtonVariantValues = ['primary', 'secondary', 'ghost'];
export type ButtonVariantType = (typeof ButtonVariantValues)[number];

export type ButtonSizeType = 'xsmall' | 'small' | 'medium' | 'large';

export type ButtonBorderType = 'square' | 'round';

export type SemanticType =
  | 'landing'
  | 'footer'
  | 'header'
  | 'landingTag'
  | 'landingHow'
  | 'chat'
  | 'profile'
  | 'searchModal'
  | 'minSmall'
  | 'minxSmallMaxMedium'
  | 'fieldInput'
  | 'minXsmalAndSmSmallMedium';

export type ButtonBaseProps = {
  size?: ButtonSizeType;
  variant?: ButtonVariantType;
  disabled?: boolean;
  isLoading?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  borderType?: ButtonBorderType;
  fullWidth?: boolean;
  customText?: boolean;
  textSize?: TextVariant;
  type?: 'button' | 'submit';
  semanticType?: SemanticType;
  alignText?: 'left' | 'center' | 'right';
  route?: string;
  className?: string;
};

export type ButtonProps = (
  | { children: React.ReactNode; rightIcon?: never; leftIcon?: never; iconColor?: never }
  | { children: React.ReactNode; rightIcon: IconType; iconColor?: IconColorType; leftIcon?: never }
  | { children: React.ReactNode; leftIcon: IconType; iconColor?: IconColorType; rightIcon?: never }
  | { children?: never; leftIcon: IconType; iconColor?: IconColorType; rightIcon?: never }
) &
  ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type' | 'className'>;

// DEPRECATED: Use SIZE_MAPPINGS.buttonToText from @/config/constants/sizeMapping instead
export const sizeToVariantMap: Record<ButtonSizeType, TextVariant> = {
  xsmall: 'p5',
  small: 'p4',
  medium: 'p3',
  large: 'p2',
};
