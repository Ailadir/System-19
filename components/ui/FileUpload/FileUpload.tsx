'use client';

import Button from '../Button';
import ImageCropperModal from '../ImageCropperModal';
import Text from '../Text';
import { FileUploadContent } from './components/FileUploadContent';
import { FileUploadButton } from './components/FileUploadButton';
import { openMobileUploadModal } from './components/MobileUploadModal';
import { useFileDragDrop } from './hooks/useFileDragDrop';
import { useFileUploadState } from './hooks/useFileUploadState';
import { useFileValidation } from './hooks/useFileValidation';
import { getStateConfig } from './utils/fileUploadConfig';
import { FileUploadProps } from './FileUpload.types';
import { useBreakpoint } from '../../../hooks/hooks';
import { modal } from '@/shared/store/modalStore';
import { useCallback, useEffect, useRef } from 'react';

import s from './FileUpload.module.scss';

function FileUpload(props: FileUploadProps) {
  const {
    accept = 'image/jpeg,image/png,image/heic',
    maxSize = 10,
    onFileSelect,
    onError,
    onUploadComplete,
    onReset,
    state = 'default',
    size = 'large',
    className = '',
    disabled = false,
    errorMessage,
    loadingProgress = 0,
    isMultipleUpload,
    enableCropper = false,
  } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';

  // Custom hooks
  const { currentState, setCurrentState, progress, setProgress, currentFile, setCurrentFile } =
    useFileUploadState(state);
  const validateFile = useFileValidation(maxSize, accept);

  // File selection handler
  const handleFileSelect = useCallback(
    (file: File) => {
      const error = validateFile(file);

      if (error) {
        setCurrentState('error');
        onError?.(error);
        return;
      }

      if (!enableCropper) {
        setCurrentState('loading');
        setProgress(0);
        setCurrentFile(file);
        onFileSelect?.(file);
        return;
      }

      // Image cropper flow
      const imageUrl = URL.createObjectURL(file);
      setCurrentFile(file);

      const modalId = modal.open({
        title: <Text variant='h4'>Редактирование фото</Text>,
        type: isMobile ? 'bottom-sheet' : 'centered',
        swipeable: isMobile,
        showCloseButton: false,
        closeOnOverlayClick: false,
        content: (
          <ImageCropperModal
            imageUrl={imageUrl}
            isOpen={true}
            onCancel={() => {
              URL.revokeObjectURL(imageUrl);
              setCurrentFile(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
              modal.close(modalId);
            }}
            onContinue={(croppedBlob) => {
              const fileName = file.name.replace(/\.[^/.]+$/, '.jpg');
              const croppedFile = new File([croppedBlob], fileName, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });

              URL.revokeObjectURL(imageUrl);
              modal.close(modalId);

              setCurrentState('loading');
              setProgress(0);
              setCurrentFile(croppedFile);
              onFileSelect?.(croppedFile);
            }}
          />
        ),
      });
    },
    [validateFile, onError, onFileSelect, isMobile, enableCropper, setCurrentState, setProgress, setCurrentFile]
  );

  // Drag and drop handlers
  const dragDropHandlers = useFileDragDrop(disabled, handleFileSelect);

  // Upload complete effect
  useEffect(() => {
    if (currentState === 'uploaded' && currentFile) {
      onUploadComplete?.(currentFile);
      setCurrentFile(null);
    }
  }, [currentState, currentFile, onUploadComplete, setCurrentFile]);

  // Input change handler
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFileSelect(files[0]);
      }
      e.target.value = '';
    },
    [handleFileSelect]
  );

  // Button click handler
  const handleButtonClick = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (currentState === 'uploaded') {
        setCurrentState('default');
        setProgress(0);
        setCurrentFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        onReset?.();
      }
      fileInputRef.current?.click();
    },
    [currentState, onReset, setCurrentState, setProgress, setCurrentFile]
  );

  // Mobile upload handler
  const handleMobileUpload = useCallback(() => {
    if (currentState === 'uploaded') {
      setCurrentState('default');
      setProgress(0);
      setCurrentFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      onReset?.();
    }
    openMobileUploadModal({ fileInputRef });
  }, [currentState, onReset, setCurrentState, setProgress, setCurrentFile]);

  const config = getStateConfig(currentState, errorMessage, isMultipleUpload);

  const containerClasses = [
    s.fileUpload,
    s[size],
    s[currentState],
    dragDropHandlers.isDragging && s.isDragging,
    disabled && s.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <div
        className={containerClasses}
        onDragOver={dragDropHandlers.handleDragOver}
        onDragLeave={dragDropHandlers.handleDragLeave}
        onDrop={dragDropHandlers.handleDrop}
      >
        <FileUploadContent
          config={config}
          progress={progress}
          loadingProgress={loadingProgress}
          currentState={currentState}
        />

        {!isMobile && (
          <div className={s.content}>
            <FileUploadButton
              config={config}
              currentState={currentState}
              size={size}
              disabled={disabled}
              onClick={handleButtonClick}
            />
          </div>
        )}
      </div>

      {isMobile && config.buttonText && (
        <div className={s.uploadMoreButton}>
          <Button
            variant={currentState === 'error' ? 'error' : 'secondary'}
            size='small'
            fullWidth
            leftIcon={config.buttonIcon as any}
            onClick={handleMobileUpload}
            disabled={disabled}
          >
            {config.buttonText}
          </Button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type='file'
        accept={accept}
        multiple={isMultipleUpload}
        onChange={handleInputChange}
        className={s.input}
        disabled={disabled}
        style={{ display: 'none' }}
      />
    </>
  );
}

export default FileUpload;
