import clsx from 'clsx';
import { ReactNode } from 'react';

import s from './Layout.module.scss';

export interface LayoutProps {
  children: ReactNode;
  bgColor?: 'primary' | 'secondary' | 'accent' | 'transparent';
  className?: string;
  tag?: 'main' | 'section' | 'div' | 'article' | 'aside';
}

export default function Layout(props: LayoutProps) {
  const { children, bgColor = 'transparent', className, tag: Component = 'div' } = props;
  const layoutClassNames = clsx(s.layout, s[`bg-${bgColor}`], className);

  return <Component className={layoutClassNames}>{children}</Component>;
}
