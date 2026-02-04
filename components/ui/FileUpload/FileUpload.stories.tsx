import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import FileUpload from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/Form/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the upload component',
    },
    state: {
      control: 'select',
      options: ['default', 'loading', 'uploaded', 'error'],
      description: 'Current state of the upload',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the upload is disabled',
    },
    enableCropper: {
      control: 'boolean',
      description: 'Enable image cropping before upload',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  render: () => {
    const [file, setFile] = useState<File | null>(null);

    return (
      <div style={{ width: '400px' }}>
        <FileUpload
          onFileSelect={(selectedFile) => {
            setFile(selectedFile);
            console.log('File selected:', selectedFile);
          }}
          onUploadComplete={(uploadedFile) => {
            console.log('Upload completed:', uploadedFile);
          }}
        />
        {file && (
          <p style={{ marginTop: '16px', textAlign: 'center' }}>
            Selected: {file.name}
          </p>
        )}
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [state, setState] = useState<'default' | 'error'>('default');

    return (
      <div style={{ width: '400px' }}>
        <FileUpload
          state={state}
          errorMessage="File size exceeds 10MB limit"
          onFileSelect={(file) => {
            if (file.size > 10 * 1024 * 1024) {
              setState('error');
            }
          }}
          onError={(error) => {
            setState('error');
            alert(error);
          }}
        />
      </div>
    );
  },
};

export const Loading: Story = {
  render: () => {
    const [state, setState] = useState<'default' | 'loading' | 'uploaded'>('default');
    const [progress, setProgress] = useState(0);

    const handleFileSelect = (file: File) => {
      setState('loading');
      setProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setState('uploaded');
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    };

    return (
      <div style={{ width: '400px' }}>
        <FileUpload
          state={state}
          loadingProgress={progress}
          onFileSelect={handleFileSelect}
          onReset={() => {
            setState('default');
            setProgress(0);
          }}
        />
      </div>
    );
  },
};

export const Uploaded: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <FileUpload
        state="uploaded"
        onReset={() => alert('Reset clicked')}
      />
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Small:</p>
        <FileUpload size="small" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Medium:</p>
        <FileUpload size="medium" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Large:</p>
        <FileUpload size="large" />
      </div>
    </div>
  ),
};

export const WithCropper: Story = {
  render: () => {
    const [file, setFile] = useState<File | null>(null);

    return (
      <div style={{ width: '400px' }}>
        <FileUpload
          enableCropper
          onFileSelect={(selectedFile) => {
            console.log('File selected (after cropping):', selectedFile);
            setFile(selectedFile);
          }}
          accept="image/jpeg,image/png"
        />
        {file && (
          <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px' }}>
            Cropped file: {file.name}
          </p>
        )}
      </div>
    );
  },
};

export const MultipleUpload: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <div style={{ width: '400px' }}>
        <FileUpload
          isMultipleUpload
          onFileSelect={(file) => {
            setFiles((prev) => [...prev, file]);
          }}
        />
        {files.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            <p style={{ fontWeight: 600, marginBottom: '8px' }}>Uploaded files:</p>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {files.map((file, i) => (
                <li key={i} style={{ fontSize: '14px' }}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};

export const CustomAccept: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <FileUpload
        accept="application/pdf,.doc,.docx"
        onFileSelect={(file) => alert(`Document selected: ${file.name}`)}
        onError={(error) => alert(error)}
      />
      <p style={{ marginTop: '12px', fontSize: '14px', color: '#666', textAlign: 'center' }}>
        Accepts only PDF and Word documents
      </p>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <FileUpload disabled />
      <p style={{ marginTop: '12px', fontSize: '14px', color: '#666', textAlign: 'center' }}>
        Upload is disabled
      </p>
    </div>
  ),
};

export const CompleteFlow: Story = {
  render: () => {
    const [state, setState] = useState<'default' | 'loading' | 'uploaded' | 'error'>('default');
    const [progress, setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const simulateUpload = (file: File) => {
      setSelectedFile(file);
      setState('loading');
      setProgress(0);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setState('uploaded');
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    };

    const handleReset = () => {
      setState('default');
      setProgress(0);
      setSelectedFile(null);
    };

    return (
      <div style={{ width: '450px' }}>
        <h3 style={{ margin: '0 0 16px 0' }}>Profile Photo Upload</h3>

        <FileUpload
          state={state}
          loadingProgress={progress}
          errorMessage="Failed to upload. Please try again."
          onFileSelect={simulateUpload}
          onUploadComplete={(file) => {
            console.log('Upload completed:', file);
          }}
          onReset={handleReset}
          onError={(error) => {
            setState('error');
            alert(error);
          }}
          accept="image/jpeg,image/png"
          maxSize={5}
        />

        {selectedFile && state !== 'default' && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
          }}>
            <p style={{ margin: '0 0 4px 0', fontSize: '14px' }}>
              <strong>File:</strong> {selectedFile.name}
            </p>
            <p style={{ margin: '0 0 4px 0', fontSize: '14px' }}>
              <strong>Size:</strong> {(selectedFile.size / 1024).toFixed(2)} KB
            </p>
            <p style={{ margin: 0, fontSize: '14px' }}>
              <strong>Status:</strong> {state === 'loading' ? `Uploading (${progress}%)` : state}
            </p>
          </div>
        )}
      </div>
    );
  },
};
