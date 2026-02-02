import { ButtonSizeType, SemanticType } from '../Button';
import { IconType } from '../Icon';

export type SegmentedControlOption<T extends string = string> = {
  label: string;
  value: T;
  leftIcon?: IconType;
};

export type SegmentedControlProps<T extends string = string> = {
  options: SegmentedControlOption<T>[];
  selectedOption: string;
  onChange: (value: T) => void;
  size?: ButtonSizeType;
  disabled?: boolean;
  semanticType?: SemanticType;
  label?: string;
  isAdaptive?: boolean;
};
