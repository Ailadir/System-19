'use client';

import FileUpload from './FileUpload';
import { FileUploadFormProps, FileUploadState } from './FileUpload.types';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

interface FormFileUploadProps<TFieldValues extends FieldValues>
  extends Omit<FileUploadFormProps, 'name'> {
  name: Path<TFieldValues>;
  /** Error callback - handle toast/logging in parent component */
  onErrorCallback?: (error: string) => void;
  /** Success callback - handle toast/logging in parent component */
  onSuccessCallback?: (message: string) => void;
}

function FormFileUploadInner<TFieldValues extends FieldValues = FieldValues>(
  {
    name,
    accept,
    maxSize,
    onError,
    onUploadComplete,
    size,
    className,
    disabled,
    errorMessage,
    uploadFn,
    isMultipleUpload,
    enableCropper,
    onErrorCallback,
    onSuccessCallback,
  }: FormFileUploadProps<TFieldValues>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { control } = useFormContext<TFieldValues>();
  const [uploadState, setUploadState] = useState<FileUploadState>('default');
  const [uploadProgress, setUploadProgress] = useState(0);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const hasErrors = !!fieldState.error;
        const errorText = hasErrors ? fieldState.error?.message || '' : errorMessage;

        const currentValue = field.value;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          const isUploaded =
            currentValue && typeof currentValue === 'object' && 'original' in currentValue;

          if (isUploaded) {
            setUploadState('uploaded');
          } else if (!currentValue) {
            setUploadState('default');
          }
        }, [currentValue]);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          if (hasErrors) {
            setUploadState('error');
          }
        }, [hasErrors]);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const handleError = useCallback(
          (error: string) => {
            onError?.(error);
            setUploadState('error');
            onErrorCallback?.(error);
          },
          [onError, onErrorCallback]
        );

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const handleReset = useCallback(() => {
          field.onChange(null);
          setUploadState('default');
          setUploadProgress(0);
        }, [field]);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const handleFileSelect = useCallback(
          async (file: File) => {
            field.onChange(file);
            setUploadState('loading');
            setUploadProgress(0);

            const progressInterval = setInterval(() => {
              setUploadProgress((prev) => {
                if (prev >= 90) {
                  clearInterval(progressInterval);
                  return 90;
                }
                return prev + 10;
              });
            }, 100);

            try {
              const response = await uploadFn.mutateAsync(file);

              clearInterval(progressInterval);
              setUploadProgress(100);

              if (response.data) {
                if ('original' in response.data) {
                  field.onChange(response.data);
                  setUploadState('uploaded');
                  onUploadComplete?.(file);
                  onSuccessCallback?.('Фото загружено');
                } else if ('passport_url' in response.data) {
                  const url = response.data.passport_url[0];
                  field.onChange(url);
                  setUploadState('uploaded');
                  onUploadComplete?.(file);
                  onSuccessCallback?.('Фото загружено');
                }
              }
            } catch (error) {
              clearInterval(progressInterval);
              setUploadState('error');
              const errorMessage = error instanceof Error ? error.message : 'Ошибка загрузки';
              handleError(errorMessage);
            }
          },
          [field, handleError, onUploadComplete, onSuccessCallback, uploadFn]
        );

        return (
          <div ref={ref}>
            <FileUpload
              accept={accept}
              maxSize={maxSize}
              onFileSelect={handleFileSelect}
              onError={handleError}
              onReset={handleReset}
              state={uploadState}
              loadingProgress={uploadProgress}
              size={size}
              className={className}
              disabled={disabled}
              errorMessage={errorText}
              uploadFn={uploadFn}
              isMultipleUpload={isMultipleUpload}
              enableCropper={enableCropper}
            />
          </div>
        );
      }}
    />
  );
}

export const FormFileUpload = forwardRef(FormFileUploadInner) as <
  TFieldValues extends FieldValues = FieldValues,
>(
  props: FormFileUploadProps<TFieldValues> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => ReturnType<typeof FormFileUploadInner>;
