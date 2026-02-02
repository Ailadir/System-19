'use client';

import Button from '../Button';
import Input from '../Input';
import { MenuItem } from '../OverflowMenu/OverflowMenu.types';
import Text from '../Text';
import { DropdownProps, dropdownSizeToButtonSize } from './Dropdown.types';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import s from './Dropdown.module.scss';

function Dropdown(props: DropdownProps) {
  const {
    name,
    label,
    placeholder,
    size = 'medium',
    leftIcon,
    autoCompleteItems,
    value,
    disabled,
    className,
    searchable = false,
    onSelect,
    onChange,
    hintText,
    errorText,
    showError,
    validationState = 'default',
    ...inputProps
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const [searchValue, setSearchValue] = useState('');

  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const buttonSize = dropdownSizeToButtonSize[size];

  const rightIcon = isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down';

  const filteredItems = searchable
    ? autoCompleteItems.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : autoCompleteItems;

  useEffect(() => {
    if (!isOpen || !wrapperRef.current || !menuRef.current) return;

    const updatePosition = () => {
      if (!wrapperRef.current || !menuRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const menuHeight = menuRef.current.offsetHeight;

      let top = rect.bottom + 8;
      const left = rect.left;
      const width = rect.width;

      if (top + menuHeight > window.innerHeight) {
        top = rect.top - menuHeight - 8;
      }

      setPosition({ top, left, width });
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleItemClick = (item: MenuItem) => {
    setIsOpen(false);
    if (searchable) {
      setSearchValue('');
    }
    if (onSelect) {
      onSelect(item);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchable) {
      setSearchValue(e.target.value);
      setIsOpen(true);
      if (onChange) {
        onChange(e.target.value);
      }
    }
  };

  const textVariant = {
    large: 'p3',
    medium: 'p4',
    small: 'p5',
  }[size] as 'p3' | 'p4' | 'p5';

  const displayValue = searchable ? (isOpen ? searchValue : value) : value;

  return (
    <div ref={wrapperRef} className={clsx(s.dropdownWrapper, className)}>
      <div className={s.inputWrapper} onClick={!searchable ? handleToggle : undefined}>
        <Input
          name={name}
          label={label}
          isRound
          placeholder={placeholder}
          size={size}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          value={displayValue}
          disabled={disabled}
          hintText={hintText}
          errorText={errorText}
          showError={showError}
          validationState={validationState}
          iconSize='medium'
          iconColor='primary'
          readOnly={!searchable}
          onChange={searchable ? handleInputChange : undefined}
          onFocus={searchable ? () => setIsOpen(true) : undefined}
          aria-haspopup='listbox'
          aria-expanded={isOpen}
          {...inputProps}
        />
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className={s.menu}
            style={{
              position: 'fixed',
              top: position.top,
              left: position.left,
              width: position.width,
            }}
            role='listbox'
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <Button
                  variant='ghost'
                  size={buttonSize}
                  fullWidth
                  key={index}
                  onClick={() => handleItemClick(item)}
                  customText
                  alignText='left'
                  type='button'
                >
                  <Text variant={textVariant} color='primary' weight='regular'>
                    {item.name}
                  </Text>
                </Button>
              ))
            ) : (
              <div style={{ padding: '12px 16px' }}>
                <Text variant={textVariant} color='disabled' weight='regular'>
                  Ничего не найдено
                </Text>
              </div>
            )}
          </div>,
          document.body,
        )}
    </div>
  );
}

export default Dropdown;
