'use client';

import Button, { ButtonProps } from '../Button';
import { IconColorType } from '../Icon';
import Text from '../Text';
import { SegmentedControlProps } from './SegmentedControl.types';
import clsx from 'clsx';
import { useId } from 'react';

import s from './SegmentedControl.module.scss';

function SegmentedControl<T extends string = string>(props: SegmentedControlProps<T>) {
  const {
    options,
    selectedOption,
    onChange,
    size = 'medium',
    semanticType,
    disabled,
    label,
    isAdaptive,
  } = props;

  const handleOptionClick = (optionValue: T) => {
    if (disabled) return;
    onChange(optionValue);
  };

  const labelClassName = s[`label-${size}`];
  const fieldId = useId();
  const rootClassNames = clsx(s.segmentedControl, s[`segmentedControl-${size}`], {
    [s.additionalMargin]: label,
    [s.adaptive]: isAdaptive,
  });

  return (
    <div className={rootClassNames}>
      {label && (
        <label className={labelClassName} htmlFor={fieldId}>
          <Text variant='p3' weight='regular' semanticType='profile'>
            {label}
          </Text>
        </label>
      )}
      {options.map((option) => {
        const { value, leftIcon } = option;
        const isActive = value === selectedOption;
        const iconColor: IconColorType = isActive ? 'primaryInverse' : 'primary';
        const iconProps = leftIcon ? { leftIcon, iconColor } : {};

        return (
          <Button
            key={value}
            variant={isActive ? 'primary' : 'ghost'}
            semanticType={semanticType}
            onClick={() => handleOptionClick(value)}
            disabled={disabled}
            borderType='round'
            {...(iconProps as ButtonProps)}
            customText
            {...(!!semanticType && size ? { size } : {})}
          >
            <Text variant='p3' semanticType='profile' weight='regular'>
              {option.label}
            </Text>
          </Button>
        );
      })}
    </div>
  );
}

export default SegmentedControl;
