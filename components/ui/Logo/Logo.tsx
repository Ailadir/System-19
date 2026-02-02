'use client';

import s from './Logo.module.scss';

export interface LogoProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
  className?: string;
}

function Logo({
  src,
  alt = 'logo',
  width = 143,
  height = 48,
  onClick,
  className
}: LogoProps) {
  return (
    <button
      onClick={onClick}
      className={`${s.logoButton} ${className || ''}`}
      type="button"
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={s.logo}
      />
    </button>
  );
}

export default Logo;
