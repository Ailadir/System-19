import Button from '../../Button';
import { StateConfig } from '../utils/fileUploadConfig';

interface FileUploadButtonProps {
  config: StateConfig;
  currentState: string;
  size: 'medium' | 'large';
  disabled: boolean;
  onClick: (e?: React.MouseEvent) => void;
}

export function FileUploadButton({
  config,
  currentState,
  size,
  disabled,
  onClick,
}: FileUploadButtonProps) {
  if (!config.buttonText) return null;

  const buttonSize = size === 'medium' ? 'medium' : 'large';
  const variant = currentState === 'error' ? ('error' as const) : ('secondary' as const);

  if (config.buttonIcon) {
    return (
      <Button
        variant={variant}
        size={buttonSize}
        leftIcon={config.buttonIcon as any}
        onClick={onClick}
        disabled={disabled}
      >
        {config.buttonText}
      </Button>
    );
  }

  return (
    <Button variant={variant} size={buttonSize} onClick={onClick} disabled={disabled}>
      {config.buttonText}
    </Button>
  );
}
