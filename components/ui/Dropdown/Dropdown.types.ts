import { IconType } from '../Icon';
import { InputProps } from '../Input/Input.types';
import { MenuItem } from '../OverflowMenu/OverflowMenu.types';

export type DropdownSizeType = 'xsmall' | 'small' | 'medium' | 'large';

export type DropdownProps = {
  name: string;
  autoCompleteItems: MenuItem[];

  label?: string;
  placeholder?: string;
  size?: DropdownSizeType;
  leftIcon?: IconType;
  value?: string;
  disabled?: boolean;
  className?: string;
  searchable?: boolean;

  onSelect?: (item: MenuItem) => void;
  onChange?: (value: string) => void;

  hintText?: string;
  errorText?: string;
  showError?: boolean;
  validationState?: 'error' | 'success' | 'default';
} & Omit<
  InputProps,
  | 'name'
  | 'leftIcon'
  | 'rightIcon'
  | 'onRightIconClick'
  | 'onChange'
  | 'type'
  | 'autoCompleteItems'
  | 'onSelect'
  | 'onClick'
  | 'onBlur'
  | 'onFocus'
>;

export const dropdownSizeToButtonSize = {
  xsmall: 'xsmall',
  small: 'xsmall',
  medium: 'small',
  large: 'medium',
} as const;
