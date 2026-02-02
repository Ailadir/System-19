'use client';

import clsx from 'clsx';
import { useEffect } from 'react';
import useBreakpoint from '../../../hooks/useBreakpoint';
import Button from '../Button';
import Text from '../Text';
import type { Toast as ToastType } from './Toast.types';

import s from './Toast.module.scss';

export interface ToastProps {
  toast: ToastType;
  onClose: (id: string) => void;
}

function Toast(props: ToastProps) {
  const { toast, onClose } = props;

  useEffect(() => {
    if (!toast.isVisible) {
      const timer = setTimeout(() => {
        onClose(toast.id);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [toast.isVisible, toast.id, onClose]);

  const wrapperClassNames = clsx(s.toastWrapper, toast.isVisible ? s.visible : s.hidden);
  const colorClassNames = clsx(s.color, s[toast.type]);
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';

  return (
    <div className={wrapperClassNames} role='alert' aria-live='polite'>
      <div className={colorClassNames}></div>
      <div className={s.toast}>
        <div className={s.content}>
          <div className={s.texts}>
            {toast.title && (
              <Text variant={isMobile ? 'p3' : 'p2'} weight='regular'>
                {toast.title}
              </Text>
            )}
            <Text variant={isMobile ? 'p5' : 'p4'} color='secondary' weight='regular'>
              {toast.message}
            </Text>
          </div>

          {toast.buttons && toast.buttons.length > 0 && (
            <div className={s.buttons}>
              {toast.buttons.map((button, index) => (
                <Button
                  key={index}
                  onClick={button.onClick}
                  variant={button.variant || 'primary'}
                  size={button.size || 'small'}
                  borderType={button.borderType || 'square'}
                  customText
                >
                  <Text variant={isMobile ? 'p5' : 'p4'} weight='regular'>
                    {button.text}
                  </Text>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Toast;
