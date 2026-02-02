export type FileUploadState = 'default' | 'loading' | 'uploaded' | 'error';
export type FileUploadSize = 'large' | 'medium';

// Generic upload response - can be any shape
export interface UploadResponse {
  data?: any;
  [key: string]: any;
}

export type UploadFunction = {
  mutateAsync: (file: File) => Promise<UploadResponse>;
};

export interface FileUploadProps {
  accept?: string;
  maxSize?: number; // in MB
  onFileSelect?: (file: File) => void;
  onError?: (error: string) => void;
  onUploadComplete?: (file: File) => void;
  onReset?: () => void;
  state?: FileUploadState;
  size?: FileUploadSize;
  className?: string;
  disabled?: boolean;
  errorMessage?: string;
  loadingProgress?: number; // 0-100
  uploadFn: UploadFunction;
  isMultipleUpload?: boolean;
  enableCropper?: boolean;
}

export interface FileUploadFormProps extends Omit<FileUploadProps, 'onFileSelect' | 'state'> {
  name?: string;
}
