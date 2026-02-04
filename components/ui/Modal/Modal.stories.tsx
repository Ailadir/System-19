import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Modal from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['centered', 'bottom-sheet', 'right-sidebar', 'left-sidebar'],
      description: 'Modal type/position',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Close modal when clicking overlay',
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Close modal when pressing Escape',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button in header',
    },
    swipeable: {
      control: 'boolean',
      description: 'Enable swipe to dismiss (mobile)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Centered: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4A90E2',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Open Centered Modal
        </button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          type="centered"
          title="Centered Modal"
          description="This modal appears in the center of the screen"
        >
          <div style={{ padding: '20px' }}>
            <p>Modal content goes here...</p>
            <p>You can add any React components inside.</p>
          </div>
        </Modal>
      </>
    );
  },
};

export const BottomSheet: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4A90E2',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Open Bottom Sheet
        </button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          type="bottom-sheet"
          title="Bottom Sheet"
          description="Slides up from bottom"
          swipeable
        >
          <div style={{ padding: '20px' }}>
            <p>This modal slides up from the bottom.</p>
            <p>Try swiping down to dismiss (on mobile).</p>
          </div>
        </Modal>
      </>
    );
  },
};

export const RightSidebar: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4A90E2',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Open Right Sidebar
        </button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          type="right-sidebar"
          title="Right Sidebar"
          description="Slides in from right"
          width="400px"
        >
          <div style={{ padding: '20px' }}>
            <p>This modal slides in from the right side.</p>
            <p>Commonly used for filters or settings.</p>
          </div>
        </Modal>
      </>
    );
  },
};

export const LeftSidebar: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4A90E2',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Open Left Sidebar
        </button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          type="left-sidebar"
          title="Left Sidebar"
          description="Slides in from left"
          width="350px"
        >
          <div style={{ padding: '20px' }}>
            <p>This modal slides in from the left side.</p>
            <p>Perfect for navigation menus.</p>
          </div>
        </Modal>
      </>
    );
  },
};

export const WithoutCloseButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4A90E2',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Open Modal
        </button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          type="centered"
          title="No Close Button"
          showCloseButton={false}
        >
          <div style={{ padding: '20px' }}>
            <p>This modal has no close button in the header.</p>
            <p>You can still close it by clicking the overlay or pressing Escape.</p>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                marginTop: '16px',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#4A90E2',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Custom Close Button
            </button>
          </div>
        </Modal>
      </>
    );
  },
};

export const NonDismissible: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4A90E2',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Open Modal
        </button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          type="centered"
          title="Non-Dismissible"
          description="You must use the button to close"
          closeOnOverlayClick={false}
          closeOnEsc={false}
        >
          <div style={{ padding: '20px' }}>
            <p>This modal cannot be dismissed by clicking overlay or pressing Escape.</p>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                marginTop: '16px',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#4A90E2',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Close Modal
            </button>
          </div>
        </Modal>
      </>
    );
  },
};

export const LargeContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4A90E2',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Open Modal with Large Content
        </button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          type="centered"
          title="Large Content Modal"
          description="Scrollable content area"
          maxHeight="80vh"
        >
          <div style={{ padding: '20px' }}>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i}>
                This is paragraph {i + 1}. The modal content is scrollable when it exceeds the maximum height.
              </p>
            ))}
          </div>
        </Modal>
      </>
    );
  },
};

export const FormModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Submitted: ${name}, ${email}`);
      setIsOpen(false);
    };

    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4A90E2',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Open Form Modal
        </button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          type="centered"
          title="Contact Form"
          description="Fill out the form below"
        >
          <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: '#4A90E2',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </Modal>
      </>
    );
  },
};

export const CustomZIndex: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4A90E2',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Open Modal with Custom Z-Index
        </button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          type="centered"
          title="Custom Z-Index"
          description="This modal has a custom z-index value"
          zIndex={9999}
        >
          <div style={{ padding: '20px' }}>
            <p>This modal has z-index set to 9999.</p>
          </div>
        </Modal>
      </>
    );
  },
};
