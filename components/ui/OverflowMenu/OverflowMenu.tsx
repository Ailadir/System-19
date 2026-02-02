'use client';

import Button from '../Button';
import Text from '../Text';
import { MenuItem, OverflowMenuProps } from './OverflowMenu.types';
import { useBreakpoint } from '../../../hooks/useBreakpoint';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { cloneElement, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import s from './OverflowMenu.module.scss';

function OverflowMenu(props: OverflowMenuProps) {
  const {
    children,
    menuItems,
    mobileMenuItems,
    handleClick,
    onOpenChange,
    position: positionType = 'auto',
    className,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const breakpoint = useBreakpoint();

  const isMobile = breakpoint === 'mobile' || breakpoint === 'tablet';
  const items = isMobile && mobileMenuItems ? mobileMenuItems : menuItems;

  useEffect(() => {
    // setIsOpen(false);
    if (!isOpen || !triggerRef.current || !menuRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const menuWidth = menuRef.current.offsetWidth;
    const menuHeight = menuRef.current.offsetHeight;

    let top = rect.bottom + 8;
    let left = rect.right - menuWidth;

    if (positionType === 'auto' && top + menuHeight > window.innerHeight) {
      top = rect.top - menuHeight - 8;
    }

    if (left < 8) {
      left = 8;
    }

    setPosition({ top, left });
  }, [isOpen, positionType]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        onOpenChange?.(false);
        if (handleClick) handleClick();
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        onOpenChange?.(false);
        if (handleClick) handleClick();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, handleClick, onOpenChange]);

  const handleItemClick = (item: MenuItem) => {
    setIsOpen(false);
    if (item.onClick) {
      item.onClick();
    } else if (item.route) {
      router.push(item.route);
    }
    onOpenChange?.(false);

    if (handleClick) handleClick();
  };

  const handleTriggerClick = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onOpenChange?.(newIsOpen);
    if (handleClick) {
      handleClick();
    }
  };

  const hasDivider = isMobile && mobileMenuItems && menuItems.length > 0;
  const menuClassNames = clsx(s.menu, className);

  return (
    <>
      <div ref={triggerRef}>{cloneElement(children, { onClick: handleTriggerClick })}</div>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className={menuClassNames}
            style={{
              position: 'fixed',
              top: position.top,
              left: position.left,
            }}
          >
            {items.map((item, index) =>
              item.name === 'divider' ? (
                <div key={index} className={s.divider} />
              ) : (
                <Button
                  variant='ghost'
                  size='medium'
                  fullWidth
                  key={index}
                  onClick={() => handleItemClick(item)}
                  customText
                  alignText='left'
                >
                  <Text variant='p4' semanticType='landing' color='primary' weight='regular'>
                    {item.name}
                  </Text>
                </Button>
              ),
            )}

            {hasDivider && (
              <>
                <div className={s.divider} />
                {menuItems.map((item, index) => (
                  <Button
                    variant='ghost'
                    size='medium'
                    fullWidth
                    key={`desktop-${index}`}
                    onClick={() => handleItemClick(item)}
                    customText
                    alignText='left'
                  >
                    <Text variant='p4' semanticType='landing' color='primary' weight='regular'>
                      {item.name}
                    </Text>
                  </Button>
                ))}
              </>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}

export default OverflowMenu;
