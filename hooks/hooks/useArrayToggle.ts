'use client';

import { useCallback, useState } from 'react';

export const useArrayToggle = <T>(initialValue: T[] = []) => {
  const [values, setValues] = useState<T[]>(initialValue);

  const toggle = useCallback((value: T) => {
    setValues((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  }, []);

  const add = useCallback((value: T) => {
    setValues((prev) => (prev.includes(value) ? prev : [...prev, value]));
  }, []);

  const remove = useCallback((value: T) => {
    setValues((prev) => prev.filter((item) => item !== value));
  }, []);

  const clear = useCallback(() => {
    setValues([]);
  }, []);

  const setValue = useCallback((newValues: T[]) => {
    setValues(newValues);
  }, []);

  const includes = useCallback(
    (value: T) => {
      return values.includes(value);
    },
    [values],
  );

  return {
    values,
    toggle,
    add,
    remove,
    clear,
    setValue,
    includes,
  };
};
