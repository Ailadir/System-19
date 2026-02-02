export type ModalType = 'bottom-sheet' | 'right-sidebar' | 'left-sidebar' | 'centered';

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  zIndex?: number;
  className?: string;
  contentClassName?: string;
  showCloseButton?: boolean;
}

export interface BottomSheetModalProps extends BaseModalProps {
  type: 'bottom-sheet';
  swipeable?: boolean;
  snapPoints?: number[];
  defaultSnapIndex?: number;
}

export interface RightSidebarModalProps extends BaseModalProps {
  type: 'right-sidebar';
  width?: string | number;
  swipeable?: boolean;
}

export interface LeftSidebarModalProps extends BaseModalProps {
  type: 'left-sidebar';
  width?: string | number;
  swipeable?: boolean;
}

export interface CenteredModalProps extends BaseModalProps {
  type: 'centered';
  maxWidth?: string | number;
  maxHeight?: string | number;
  swipeable?: boolean;
}

export type ModalProps =
  | BottomSheetModalProps
  | RightSidebarModalProps
  | LeftSidebarModalProps
  | CenteredModalProps;
