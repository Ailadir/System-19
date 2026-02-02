import { useEffect, useState } from 'react';
import { FileUploadState } from '../FileUpload.types';

/**
 * File upload state management hook
 *
 * Manages upload state and progress
 */
export function useFileUploadState(externalState: FileUploadState) {
  const [currentState, setCurrentState] = useState<FileUploadState>(externalState);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  useEffect(() => {
    setCurrentState(externalState);
  }, [externalState]);

  return {
    currentState,
    setCurrentState,
    progress,
    setProgress,
    currentFile,
    setCurrentFile,
  };
}
