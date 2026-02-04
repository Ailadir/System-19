import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Toast from './Toast';
import type { Toast as ToastType } from './Toast.types';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  render: () => {
    const [removed, setRemoved] = useState(false);
    const toast: ToastType = {
      id: '1',
      type: 'success',
      title: 'Success',
      message: 'Operation completed successfully!',
      isVisible: !removed,
    };

    return removed ? (
      <button onClick={() => setRemoved(false)} style={{ padding: '12px 24px' }}>
        Show Toast
      </button>
    ) : (
      <Toast toast={toast} onClose={() => setRemoved(true)} />
    );
  },
};

export const Error: Story = {
  render: () => {
    const [removed, setRemoved] = useState(false);
    const toast: ToastType = {
      id: '2',
      type: 'error',
      title: 'Error',
      message: 'Something went wrong. Please try again.',
      isVisible: !removed,
    };

    return removed ? (
      <button onClick={() => setRemoved(false)} style={{ padding: '12px 24px' }}>
        Show Toast
      </button>
    ) : (
      <Toast toast={toast} onClose={() => setRemoved(true)} />
    );
  },
};

export const Info: Story = {
  render: () => {
    const [removed, setRemoved] = useState(false);
    const toast: ToastType = {
      id: '3',
      type: 'info',
      title: 'Information',
      message: 'Here is some important information.',
      isVisible: !removed,
    };

    return removed ? (
      <button onClick={() => setRemoved(false)} style={{ padding: '12px 24px' }}>
        Show Toast
      </button>
    ) : (
      <Toast toast={toast} onClose={() => setRemoved(true)} />
    );
  },
};

export const Warning: Story = {
  render: () => {
    const [removed, setRemoved] = useState(false);
    const toast: ToastType = {
      id: '4',
      type: 'warning',
      title: 'Warning',
      message: 'Please review your changes before proceeding.',
      isVisible: !removed,
    };

    return removed ? (
      <button onClick={() => setRemoved(false)} style={{ padding: '12px 24px' }}>
        Show Toast
      </button>
    ) : (
      <Toast toast={toast} onClose={() => setRemoved(true)} />
    );
  },
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Toast
        toast={{
          id: '1',
          type: 'success',
          title: 'Success',
          message: 'Operation successful',
          isVisible: true,
        }}
        onClose={() => {}}
      />
      <Toast
        toast={{
          id: '2',
          type: 'error',
          title: 'Error',
          message: 'Something went wrong',
          isVisible: true,
        }}
        onClose={() => {}}
      />
      <Toast
        toast={{
          id: '3',
          type: 'info',
          title: 'Info',
          message: 'Important information',
          isVisible: true,
        }}
        onClose={() => {}}
      />
      <Toast
        toast={{
          id: '4',
          type: 'warning',
          title: 'Warning',
          message: 'Please be careful',
          isVisible: true,
        }}
        onClose={() => {}}
      />
    </div>
  ),
};

export const WithoutTitle: Story = {
  render: () => {
    const toast: ToastType = {
      id: '5',
      type: 'info',
      message: 'This toast has no title, only a message.',
      isVisible: true,
    };

    return <Toast toast={toast} onClose={() => {}} />;
  },
};

export const WithButtons: Story = {
  render: () => {
    const [action, setAction] = useState('');
    const toast: ToastType = {
      id: '6',
      type: 'info',
      title: 'Action Required',
      message: 'Would you like to proceed with this action?',
      isVisible: true,
      buttons: [
        {
          text: 'Cancel',
          onClick: () => setAction('Cancelled'),
          variant: 'secondary',
        },
        {
          text: 'Confirm',
          onClick: () => setAction('Confirmed'),
          variant: 'primary',
        },
      ],
    };

    return (
      <div>
        <Toast toast={toast} onClose={() => {}} />
        {action && <p style={{ marginTop: '16px' }}>Action: {action}</p>}
      </div>
    );
  },
};

export const LongMessage: Story = {
  render: () => {
    const toast: ToastType = {
      id: '7',
      type: 'warning',
      title: 'Important Notice',
      message:
        'This is a very long message that demonstrates how the toast component handles longer text content. It should wrap appropriately and maintain readability.',
      isVisible: true,
    };

    return <Toast toast={toast} onClose={() => {}} />;
  },
};

export const AutoDismiss: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    const toast: ToastType = {
      id: '8',
      type: 'success',
      title: 'Auto Dismiss',
      message: 'This toast will auto-dismiss after animation.',
      isVisible: visible,
    };

    return (
      <div>
        {visible ? (
          <Toast toast={toast} onClose={() => setVisible(false)} />
        ) : (
          <button
            onClick={() => setVisible(true)}
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
        )}
      </div>
    );
  },
};

export const WithMultipleButtons: Story = {
  render: () => {
    const [action, setAction] = useState('');
    const toast: ToastType = {
      id: '9',
      type: 'info',
      title: 'Choose Action',
      message: 'Select one of the actions below.',
      isVisible: true,
      buttons: [
        {
          text: 'Option 1',
          onClick: () => setAction('Option 1'),
          variant: 'ghost',
          size: 'small',
        },
        {
          text: 'Option 2',
          onClick: () => setAction('Option 2'),
          variant: 'secondary',
          size: 'small',
        },
        {
          text: 'Confirm',
          onClick: () => setAction('Confirmed'),
          variant: 'primary',
          size: 'small',
        },
      ],
    };

    return (
      <div>
        <Toast toast={toast} onClose={() => {}} />
        {action && <p style={{ marginTop: '16px' }}>Selected: {action}</p>}
      </div>
    );
  },
};
