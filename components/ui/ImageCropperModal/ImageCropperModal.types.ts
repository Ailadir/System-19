export interface ImageCropperModalProps {
  imageUrl: string;
  onCancel: () => void;
  onContinue: (croppedImage: Blob) => void;
  isOpen: boolean;
}
