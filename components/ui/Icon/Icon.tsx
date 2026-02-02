import { type IconProps } from './Icon.types';
import { icons } from './icons';
import clsx from 'clsx';

import s from './Icon.module.scss';

function Icon(props: IconProps) {
  const { icon, color, size = 'medium', className, onClick } = props;

  const SvgIcon = icons[icon];
  if (!SvgIcon) return null;

  const colorClassName = color ? s[`icon-${color}`] : s['icon-primary'];
  const sizeClassName = s[`icon-${size}`];

  const iconClassNames = clsx(s.root, colorClassName, sizeClassName, className);

  return <SvgIcon className={iconClassNames} onClick={onClick} />;
}

export default Icon;
