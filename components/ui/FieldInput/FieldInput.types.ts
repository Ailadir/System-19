import { IconColorType, IconSizeType, IconType } from '../Icon';
import { ChangeEvent, TextareaHTMLAttributes } from 'react';

type FieldInputSizeType = 'xsmall' | 'small' | 'medium' | 'large';

export type FieldInputProps = {
  label?: string;
  name: string;

  placeholder?: string;
  hintText?: string;
  size?: FieldInputSizeType;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  value?: string;
  rows?: number;

  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;

  errorText?: string;
  showError?: boolean;

  validationState?: 'error' | 'success' | 'default';

  //адаптивность
  semanticType?: 'profile' | 'minSmall';

  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconColor?: IconColorType;
  rightIconColor?: IconColorType;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
  isRound?: boolean;
  iconSize?: IconSizeType;

  disableResize?: boolean;

  autoGrow?: boolean;
  minRows?: number;
  maxRows?: number;

  onEnterPress?: () => void;

  //Костыль для чата
  rightButtonRef?: React.Ref<HTMLButtonElement>;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'onChange'>;
