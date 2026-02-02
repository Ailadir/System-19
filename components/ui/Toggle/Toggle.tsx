'use client';

import { ToggleProps } from './Toggle.types';
import clsx from 'clsx';

import s from './Toggle.module.scss';

function Toggle(props: ToggleProps) {
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
  } = props;

  const containerClassName = clsx(s.container, disabled && s.disabled, error && s.error, className);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

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
      <span className={s.toggle}>
        <span className={s.slider} />
      </span>
      {label}
    </label>
  );
}

export default Toggle;
