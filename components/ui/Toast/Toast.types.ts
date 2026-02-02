import type { ButtonVariant } from '../Button/Button.types';

export interface ToastButton {
  text: string;
  onClick: () => void;
  variant?: ButtonVariant;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  borderType?: 'square' | 'round';
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  isVisible: boolean;
  buttons?: ToastButton[];
}
