'use client';

import Icon from '../Icon';
import { CheckboxProps } from './Checkbox.types';
import clsx from 'clsx';

import s from './Checkbox.module.scss';

function Checkbox(props: CheckboxProps) {
  const {
    id,
    name,
    checked,
    onChange,
    disabled = false,
    label,
    className = '',
    error = false,
    required = false,
    value,
    variant = 'primary',
  } = props;

  const containerClassName = clsx(s.container, disabled && s.disabled, error && s.error, className);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  const checkboxClassName = clsx(s.checkbox, s[`${variant}`]);
  return (
    <label className={containerClassName}>
      <input
        type='checkbox'
        id={id}
        name={name}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        value={value}
        className={s.input}
      />
      <span className={checkboxClassName}>
        <Icon icon='check' color='primaryInverse'></Icon>
      </span>
      {label}
    </label>
  );
}

export default Checkbox;
