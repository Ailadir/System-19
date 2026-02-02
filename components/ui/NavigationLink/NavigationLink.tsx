'use client';

import { NavigationLinkProps } from './NavigationLink.types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavigationLink({
  href,
  children,
  onClick,
  className,
  activeClassName,
  exactMatch = false,
  interceptNavigation,
  prefetch = true,
  ...props
}: NavigationLinkProps) {
  const pathname = usePathname();

  const isActive = exactMatch ? pathname === href : pathname.startsWith(href);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (interceptNavigation) {
      e.preventDefault();
      interceptNavigation(href);
    }
    onClick?.(e);
  };

  const combinedClassName = [className, isActive && activeClassName].filter(Boolean).join(' ');

  if (interceptNavigation) {
    return (
      <a href={href} onClick={handleClick} className={combinedClassName} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={combinedClassName}
      prefetch={prefetch}
      {...props}
    >
      {children}
    </Link>
  );
}
