import { type IconColorType, type IconSizeType, type IconType } from '../Icon';
import { ChangeEvent, InputHTMLAttributes } from 'react';

type InputSizeType = 'xsmall' | 'small' | 'medium' | 'large';
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date';

export type InputProps = {
  //form props
  label?: string;
  name: string;

  //styling props
  placeholder?: string;
  hintText?: string;
  size?: InputSizeType;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  type?: InputType;
  value?: string | number;
  isRound?: boolean;

  //icon props
  leftIcon?: IconType;
  rightIcon?: IconType;
  iconSize?: IconSizeType;
  iconColor?: IconColorType;
  onRightIconClick?: () => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;

  //error props
  errorText?: string;
  showError?: boolean;

  //validation state props
  validationState?: 'error' | 'success' | 'default';

  //адаптивность
  semanticType?: 'profile' | 'minSmall';
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>;
