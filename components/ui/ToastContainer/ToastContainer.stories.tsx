import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ToastContainer from './ToastContainer';
import type { Toast } from '../Toast/Toast.types';

const meta: Meta<typeof ToastContainer> = {
  title: 'Components/ToastContainer',
  component: ToastContainer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToastContainer>;

export const SingleToast: Story = {
  render: () => {
    const [toasts, setToasts] = useState<Toast[]>([
      {
        id: '1',
        type: 'success',
        title: 'Success',
        message: 'Operation completed successfully!',
        isVisible: true,
      },
    ]);

    const removeToast = (id: string) => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const addToast = () => {
      const id = Date.now().toString();
      setToasts([
        {
          id,
          type: 'success',
          title: 'New Toast',
          message: 'This is a new toast message.',
          isVisible: true,
        },
      ]);
    };

    return (
      <div style={{ padding: '20px' }}>
        <button
          onClick={addToast}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4A90E2',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Show Toast
        </button>
        <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      </div>
    );
  },
};

export const MultipleToasts: Story = {
  render: () => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = (id: string) => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const addToast = (type: 'success' | 'error' | 'info' | 'warning') => {
      const id = Date.now().toString();
      const messages = {
        success: 'Operation completed successfully!',
        error: 'An error occurred.',
        info: 'Here is some information.',
        warning: 'Please be careful.',
      };

      setToasts((prev) => [
        ...prev,
        {
          id,
          type,
          title: type.charAt(0).toUpperCase() + type.slice(1),
          message: messages[type],
          isVisible: true,
        },
      ]);
    };

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <button
            onClick={() => addToast('success')}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#4CAF50',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Success
          </button>
          <button
            onClick={() => addToast('error')}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#F44336',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Error
          </button>
          <button
            onClick={() => addToast('info')}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#2196F3',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Info
          </button>
          <button
            onClick={() => addToast('warning')}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#FF9800',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Warning
          </button>
        </div>
        <p>Active toasts: {toasts.length}</p>
        <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      </div>
    );
  },
};

export const WithActions: Story = {
  render: () => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [actions, setActions] = useState<string[]>([]);

    const removeToast = (id: string) => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const addActionToast = () => {
      const id = Date.now().toString();
      setToasts((prev) => [
        ...prev,
        {
          id,
          type: 'info',
          title: 'Action Required',
          message: 'Would you like to proceed?',
          isVisible: true,
          buttons: [
            {
              text: 'Cancel',
              onClick: () => {
                setActions((prev) => [...prev, `Toast ${id}: Cancelled`]);
                removeToast(id);
              },
              variant: 'secondary',
              size: 'small',
            },
            {
              text: 'Confirm',
              onClick: () => {
                setActions((prev) => [...prev, `Toast ${id}: Confirmed`]);
                removeToast(id);
              },
              variant: 'primary',
              size: 'small',
            },
          ],
        },
      ]);
    };

    return (
      <div style={{ padding: '20px' }}>
        <button
          onClick={addActionToast}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4A90E2',
            color: 'white',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          Show Action Toast
        </button>
        {actions.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h4>Actions Log:</h4>
            <ul>
              {actions.map((action, i) => (
                <li key={i}>{action}</li>
              ))}
            </ul>
          </div>
        )}
        <p>Active toasts: {toasts.length}</p>
        <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      </div>
    );
  },
};

export const StackedToasts: Story = {
  render: () => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [counter, setCounter] = useState(0);

    const removeToast = (id: string) => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const addMultipleToasts = () => {
      const types: Array<'success' | 'error' | 'info' | 'warning'> = ['success', 'error', 'info', 'warning'];
      const newToasts: Toast[] = types.map((type, i) => ({
        id: `${Date.now()}-${i}`,
        type,
        title: `Toast ${counter + i + 1}`,
        message: `This is toast number ${counter + i + 1}`,
        isVisible: true,
      }));
      setToasts((prev) => [...prev, ...newToasts]);
      setCounter((prev) => prev + 4);
    };

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <button
            onClick={addMultipleToasts}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#4A90E2',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Add 4 Toasts
          </button>
          <button
            onClick={() => setToasts([])}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              backgroundColor: 'white',
              cursor: 'pointer',
            }}
          >
            Clear All
          </button>
        </div>
        <p>Active toasts: {toasts.length}</p>
        <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      </div>
    );
  },
};

export const EmptyContainer: Story = {
  render: () => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = () => {
      setToasts([
        {
          id: '1',
          type: 'info',
          title: 'Info',
          message: 'This is a toast message.',
          isVisible: true,
        },
      ]);
    };

    return (
      <div style={{ padding: '20px' }}>
        <p>When no toasts are active, the container renders nothing.</p>
        <button
          onClick={addToast}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4A90E2',
            color: 'white',
            cursor: 'pointer',
            marginTop: '12px',
          }}
        >
          Show Toast
        </button>
        <ToastContainer toasts={toasts} onRemoveToast={() => setToasts([])} />
      </div>
    );
  },
};

export const AutoDismiss: Story = {
  render: () => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = (id: string) => {
      setToasts((prev) =>
        prev.map((toast) => (toast.id === id ? { ...toast, isVisible: false } : toast))
      );
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 300);
    };

    const addToast = () => {
      const id = Date.now().toString();
      const newToast: Toast = {
        id,
        type: 'success',
        title: 'Auto Dismiss',
        message: 'This toast will auto-dismiss in 3 seconds.',
        isVisible: true,
      };
      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        removeToast(id);
      }, 3000);
    };

    return (
      <div style={{ padding: '20px' }}>
        <button
          onClick={addToast}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4A90E2',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Show Auto-Dismiss Toast
        </button>
        <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      </div>
    );
  },
};
