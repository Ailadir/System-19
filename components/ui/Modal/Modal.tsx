'use client';

import Button from '../Button';
import Text from '../Text';
import { ModalProps } from './Modal.types';
import { useBodyScrollLock, useModalResponsive } from '../../../hooks/hooks';
import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import s from './Modal.module.scss';

export default function Modal(props: ModalProps) {
  const {
    isOpen,
    onClose,
    children,
    title,
    description,
    closeOnOverlayClick = true,
    closeOnEsc = true,
    zIndex = 1000,
    className,
    contentClassName,
    swipeable,
    type,
    showCloseButton = true,
  } = props;

  const { isMobile } = useModalResponsive();

  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else if (isVisible) {
      setIsVisible(false);
      setTimeout(() => {
        setIsAnimating(false);
        setDragY(0);
      }, 300);
    }
  }, [isOpen, isVisible]);

  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose, closeOnEsc]);

  useBodyScrollLock(isOpen);

  const shouldBeDragHandle =
    isMobile && swipeable && (type === 'bottom-sheet' || type === 'right-sidebar');

  const handleDragHandleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!shouldBeDragHandle) return;

      startY.current = e.touches[0].clientY;
      currentY.current = e.touches[0].clientY;
      setIsDragging(true);
      e.stopPropagation();
    },
    [shouldBeDragHandle],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const isSwipeable = type === 'bottom-sheet' ? swipeable !== false : swipeable;
      if (!isSwipeable || !isDragging) return;

      currentY.current = e.touches[0].clientY;
      const deltaY = currentY.current - startY.current;

      if (deltaY > 0) {
        setDragY(deltaY);
        e.preventDefault();
      }
    },
    [swipeable, type, isDragging],
  );

  const handleTouchEnd = useCallback(() => {
    const isSwipeable = type === 'bottom-sheet' ? swipeable !== false : swipeable;

    if (!isSwipeable || !isDragging) return;

    setIsDragging(false);
    const deltaY = currentY.current - startY.current;

    if (deltaY > 100) {
      onClose();
    } else {
      setDragY(0);
    }
  }, [type, swipeable, isDragging, onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!mounted || !isAnimating) return null;

  const overlayClasses = clsx(
    s.overlay,
    isVisible && s.entered,
    !isVisible && s.exiting,
    s[`overlay_${props.type}`],
  );

  const modalClasses = clsx(s.modal, s[`modal_${props.type}`], className, swipeable && s.swipeable);

  const modalStyle: React.CSSProperties = {
    zIndex,
    ...(dragY > 0 && {
      transform: `translateY(${dragY}px)`,
      transition: isDragging ? 'none' : undefined,
    }),
    ...(props.type === 'right-sidebar' &&
      props.width && {
        width: props.width,
      }),
    ...(props.type === 'left-sidebar' &&
      props.width && {
        width: props.width,
      }),
    ...(props.type === 'centered' && {
      maxHeight: props.maxHeight || '90vh',
    }),
  };
  return createPortal(
    <div className={overlayClasses} onClick={handleOverlayClick} style={{ zIndex }}>
      <div ref={modalRef} className={modalClasses} style={modalStyle}>
        {shouldBeDragHandle && (
          <div
            className={s.dragHandle}
            onTouchStart={handleDragHandleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className={s.dragHandleBar} />
          </div>
        )}
        <div className={s.header}>
          <div className={s.texts}>
            {title && (
              <Text variant='h2' semanticType='search' clamp={1}>
                {title}
              </Text>
            )}

            {description && (
              <Text variant='p2' color='secondary' weight='regular' semanticType='search'>
                {description}
              </Text>
            )}
          </div>
          {showCloseButton && (
            <Button
              leftIcon='close'
              size='medium'
              semanticType='searchModal'
              onClick={onClose}
              variant='secondary'
              borderType='round'
            />
          )}
        </div>
        <div ref={contentRef} className={clsx(s.content, contentClassName)}>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
