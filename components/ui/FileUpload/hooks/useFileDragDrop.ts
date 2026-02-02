import { useCallback, useState } from 'react';

/**
 * File drag and drop hook
 *
 * Manages drag and drop state and event handlers
 */
export function useFileDragDrop(
  disabled: boolean,
  onFileSelect: (file: File) => void
) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) {
        setIsDragging(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled) return;

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        onFileSelect(files[0]);
      }
    },
    [disabled, onFileSelect]
  );

  return {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}
