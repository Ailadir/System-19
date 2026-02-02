import { ReactElement } from 'react';

export interface MenuItem {
  name: string;
  route?: string;
  onClick?: () => void;
}

export type OverflowMenuPosition = 'auto' | 'bottom';

export interface OverflowMenuProps {
  children: ReactElement<{ onClick?: React.MouseEventHandler }>;
  menuItems: MenuItem[];
  mobileMenuItems?: MenuItem[];
  handleClick?: () => void;
  onOpenChange?: (isOpen: boolean) => void;
  position?: OverflowMenuPosition;
  className?: string;
}
