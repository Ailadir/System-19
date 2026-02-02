import { useCallback } from 'react';

/**
 * File validation hook
 *
 * Provides file validation logic for size and format constraints
 */
export function useFileValidation(maxSize: number, accept: string) {
  return useCallback(
    (file: File): string | null => {
      // Validate file format
      if (!file.type.match(/^image\/(jpeg|png|heic)$/)) {
        return 'Неподходящий формат файла. Поддерживаются только JPEG, PNG, HEIC';
      }

      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        return `Файл слишком большой. Максимальный размер: ${maxSize} МБ`;
      }

      return null;
    },
    [maxSize, accept]
  );
}
