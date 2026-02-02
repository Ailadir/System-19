/**
 * Email sanitizer - removes spaces and converts to lowercase
 */
export function withEmailSanitizer(onChange: (value: string) => void) {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = event.target.value
      .trim()
      .toLowerCase()
      .replace(/\s/g, '');
    onChange(sanitized);
  };
}

/**
 * Cyrillic-only sanitizer - removes non-Cyrillic characters
 */
export function withCyrillicOnlySanitizer(onChange: (value: string) => void) {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = event.target.value.replace(/[^а-яА-ЯёЁ\s-]/g, '');
    onChange(sanitized);
  };
}
