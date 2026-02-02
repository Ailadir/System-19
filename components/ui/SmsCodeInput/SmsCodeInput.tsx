'use client';

import Input from '../Input';
import { forwardRef, useEffect, useRef, useState } from 'react';

import s from './SmsCodeInput.module.scss';

export interface SmsCodeInputProps {
  value?: string[];
  onChange?: (code: string[]) => void;
  onComplete?: (code: string) => void;
  length?: number;
  disabled?: boolean;
  className?: string;
}

const SmsCodeInput = forwardRef<HTMLDivElement, SmsCodeInputProps>(
  (
    { value = ['', '', '', ''], onChange, onComplete, length = 4, disabled = false, className },
    ref,
  ) => {
    const [code, setCode] = useState(value);
    const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>([]);

    useEffect(() => {
      setCode(value);
    }, [value]);

    useEffect(() => {
      const firstInput = inputRefs.current[0];
      if (firstInput && 'focus' in firstInput) {
        firstInput.focus();
      }
    }, []);

    const handleInputChange = (index: number, inputValue: string) => {
      if (inputValue.length > 1) return;
      if (inputValue && !/^\d$/.test(inputValue)) return;

      const newCode = [...code];
      newCode[index] = inputValue;
      setCode(newCode);
      onChange?.(newCode);

      if (inputValue && index < length - 1) {
        const nextInput = inputRefs.current[index + 1];
        if (nextInput && 'focus' in nextInput) {
          nextInput.focus();
        }
      }

      if (inputValue && index === length - 1 && newCode.every((digit) => digit)) {
        onComplete?.(newCode.join(''));
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
      if (e.key === 'Backspace' && !code[index] && index > 0) {
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
        onChange?.(newCode);

        const prevInput = inputRefs.current[index - 1];
        if (prevInput && 'focus' in prevInput) {
          prevInput.focus();
        }
      }
    };

    return (
      <div ref={ref} className={`${s.root} ${className || ''}`}>
        {Array.from({ length }, (_, index) => (
          <Input
            name={`code-${index}`}
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type='text'
            inputMode='numeric'
            size='large'
            semanticType='minSmall'
            maxLength={1}
            value={code[index] || ''}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={s.codeInput}
            disabled={disabled}
            isRound
          />
        ))}
      </div>
    );
  },
);

SmsCodeInput.displayName = 'SmsCodeInput';

export default SmsCodeInput;
