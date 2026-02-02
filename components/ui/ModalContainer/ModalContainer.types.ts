import type { ReactNode } from 'react';
import type { ModalProps } from '../Modal/Modal.types';

export interface ModalData {
  id: string;
  type?: ModalProps['type'];
  title?: string;
  content: ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  className?: string;
  showCloseButton?: boolean;
  width?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  swipeable?: boolean;
}
