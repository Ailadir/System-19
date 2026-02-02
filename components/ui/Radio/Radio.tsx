'use client';

import { RadioProps } from './Radio.types';
import clsx from 'clsx';

import s from './Radio.module.scss';

function Radio(props: RadioProps) {
  const {
    id,
    name,
    value,
    checked,
    onChange,
    disabled = false,
    className = '',
    error = false,
    label,
    required = false,
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
        type='radio'
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        className={s.input}
      />
      <span className={s.radio}>
        <span className={s.dot} />
      </span>
      {label}
    </label>
  );
}

export default Radio;
