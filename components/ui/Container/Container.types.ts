export type ContainerBorderRadiusType = '100' | '48' | '32' | '24' | '16' | '0';
export type ContainerBgColorType =
  | 'primary'
  | 'secondary'
  | 'accentSubdued'
  | 'accent'
  | 'transparent';
export type ContainerPaddingType = '8';

export type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  borderRadius?: ContainerBorderRadiusType;
  bgColor?: ContainerBgColorType;
  onClick?: () => void;
  fitWidth?: boolean;
  fullWidth?: boolean;
  padding?: ContainerPaddingType;
  margin?: 'auto' | 'noMargin';
};
