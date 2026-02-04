import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ImageCropperModal from './ImageCropperModal';

const meta: Meta<typeof ImageCropperModal> = {
  title: 'Components/Form/ImageCropperModal',
  component: ImageCropperModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ImageCropperModal>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setImageUrl(url);
        setIsOpen(true);
      }
    };

    const handleContinue = (blob: Blob) => {
      console.log('Cropped image blob:', blob);
      alert(`Image cropped! Size: ${(blob.size / 1024).toFixed(2)} KB`);
      URL.revokeObjectURL(imageUrl);
      setIsOpen(false);
      setImageUrl('');
    };

    const handleCancel = () => {
      URL.revokeObjectURL(imageUrl);
      setIsOpen(false);
      setImageUrl('');
    };

    return (
      <div>
        <button
          onClick={() => document.getElementById('file-input')?.click()}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4A90E2',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Select Image to Crop
        </button>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        {isOpen && (
          <ImageCropperModal
            imageUrl={imageUrl}
            isOpen={isOpen}
            onCancel={handleCancel}
            onContinue={handleContinue}
          />
        )}
      </div>
    );
  },
};

export const WithPreviewImage: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const sampleImageUrl = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400';

    const handleContinue = (blob: Blob) => {
      const croppedUrl = URL.createObjectURL(blob);
      const img = document.getElementById('preview-img') as HTMLImageElement;
      if (img) {
        img.src = croppedUrl;
      }
      setIsOpen(false);
    };

    return (
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4A90E2',
            color: 'white',
            cursor: 'pointer',
            marginBottom: '16px',
          }}
        >
          Open Cropper
        </button>

        <div>
          <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Preview:</p>
          <img
            id="preview-img"
            src={sampleImageUrl}
            alt="Preview"
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '50%',
              border: '2px solid #e0e0e0',
            }}
          />
        </div>

        {isOpen && (
          <ImageCropperModal
            imageUrl={sampleImageUrl}
            isOpen={isOpen}
            onCancel={() => setIsOpen(false)}
            onContinue={handleContinue}
          />
        )}
      </div>
    );
  },
};

export const ProfilePictureFlow: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [croppedImageUrl, setCroppedImageUrl] = useState('');

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setImageUrl(url);
        setIsOpen(true);
      }
    };

    const handleContinue = (blob: Blob) => {
      const url = URL.createObjectURL(blob);
      setCroppedImageUrl(url);
      URL.revokeObjectURL(imageUrl);
      setIsOpen(false);
      setImageUrl('');
    };

    const handleCancel = () => {
      URL.revokeObjectURL(imageUrl);
      setIsOpen(false);
      setImageUrl('');
    };

    return (
      <div style={{
        width: '400px',
        padding: '24px',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        textAlign: 'center',
      }}>
        <h3 style={{ margin: '0 0 16px 0' }}>Update Profile Picture</h3>

        <div style={{ marginBottom: '24px' }}>
          {croppedImageUrl ? (
            <img
              src={croppedImageUrl}
              alt="Profile"
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '50%',
                border: '3px solid #4A90E2',
              }}
            />
          ) : (
            <div
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                backgroundColor: '#f5f5f5',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                color: '#ccc',
              }}
            >
              👤
            </div>
          )}
        </div>

        <button
          onClick={() => document.getElementById('profile-upload')?.click()}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4A90E2',
            color: 'white',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          {croppedImageUrl ? 'Change Photo' : 'Upload Photo'}
        </button>

        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        {isOpen && (
          <ImageCropperModal
            imageUrl={imageUrl}
            isOpen={isOpen}
            onCancel={handleCancel}
            onContinue={handleContinue}
          />
        )}

        <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
          Recommended: Square image, at least 400x400px
        </p>
      </div>
    );
  },
};

export const UsageExample: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h2>ImageCropperModal Usage</h2>
      <p>
        This component allows users to crop images to a circular shape before uploading.
        Perfect for profile pictures and avatars.
      </p>

      <h3>Features:</h3>
      <ul>
        <li>Circular crop shape</li>
        <li>Zoom and pan controls</li>
        <li>Mobile-optimized (bottom sheet on mobile)</li>
        <li>Processing indicator</li>
        <li>High-quality JPEG output (95% quality)</li>
      </ul>

      <h3>Usage:</h3>
      <pre style={{
        backgroundColor: '#f5f5f5',
        padding: '16px',
        borderRadius: '8px',
        overflow: 'auto',
        fontSize: '14px',
      }}>
        {`const [isOpen, setIsOpen] = useState(false);
const [imageUrl, setImageUrl] = useState('');

<ImageCropperModal
  imageUrl={imageUrl}
  isOpen={isOpen}
  onCancel={() => setIsOpen(false)}
  onContinue={(blob) => {
    // Handle cropped image blob
    const file = new File([blob], 'avatar.jpg');
    uploadFile(file);
  }}
/>`}
      </pre>

      <h3>Props:</h3>
      <ul>
        <li><strong>imageUrl:</strong> URL of the image to crop</li>
        <li><strong>isOpen:</strong> Whether the modal is open</li>
        <li><strong>onCancel:</strong> Callback when user cancels</li>
        <li><strong>onContinue:</strong> Callback with cropped image blob</li>
      </ul>
    </div>
  ),
};
