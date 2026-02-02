import { AnchorHTMLAttributes } from 'react';

export interface NavigationLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  exactMatch?: boolean;
  interceptNavigation?: (path: string) => void;
  prefetch?: boolean;
}
