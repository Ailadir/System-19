import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Banner from './Banner';

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['progress', 'critical', 'success', 'accent'],
      description: 'Banner type/variant',
    },
    noBanner: {
      control: 'boolean',
      description: 'Hide the decorative banner image',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Success: Story = {
  args: {
    type: 'success',
    icon: 'check_circle',
    title: 'Success!',
    description: 'Your action was completed successfully.',
    buttonText: 'Continue',
    onButtonClick: () => alert('Button clicked!'),
  },
};

export const Critical: Story = {
  args: {
    type: 'critical',
    icon: 'error',
    title: 'Error Occurred',
    description: 'Something went wrong. Please try again.',
    buttonText: 'Retry',
    onButtonClick: () => alert('Retry clicked!'),
  },
};

export const Progress: Story = {
  args: {
    type: 'progress',
    icon: 'pending',
    title: 'In Progress',
    description: 'Your request is being processed.',
    buttonText: 'View Details',
    onButtonClick: () => alert('View details clicked!'),
  },
};

export const Accent: Story = {
  args: {
    type: 'accent',
    icon: 'star',
    title: 'Special Offer!',
    description: 'Check out our latest promotion.',
    buttonText: 'Learn More',
    onButtonClick: () => alert('Learn more clicked!'),
  },
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <Banner
        type="success"
        icon="check_circle"
        title="Success"
        description="Operation completed"
      />
      <Banner
        type="critical"
        icon="error"
        title="Error"
        description="Something went wrong"
      />
      <Banner
        type="progress"
        icon="pending"
        title="Processing"
        description="Please wait"
      />
      <Banner
        type="accent"
        icon="star"
        title="Featured"
        description="Special content"
      />
    </div>
  ),
};

export const WithoutButton: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <Banner
        type="success"
        icon="info"
        title="Information"
        description="This banner has no button"
      />
    </div>
  ),
};

export const WithoutImage: Story = {
  args: {
    type: 'success',
    icon: 'check_circle',
    title: 'Clean Banner',
    description: 'No decorative image',
    noBanner: true,
    buttonText: 'Action',
    onButtonClick: () => {},
  },
};

export const Clickable: Story = {
  render: () => {
    const [clicked, setClicked] = useState(false);
    return (
      <div style={{ width: '300px' }}>
        <Banner
          type="accent"
          icon="touch_app"
          title="Clickable Banner"
          description="Click anywhere on this banner"
          onClick={() => setClicked(!clicked)}
        />
        {clicked && <p style={{ marginTop: '16px', textAlign: 'center' }}>Banner clicked!</p>}
      </div>
    );
  },
};

export const LongContent: Story = {
  args: {
    type: 'progress',
    icon: 'info',
    title: 'This is a very long title that might wrap to multiple lines',
    description: 'This is a longer description that provides more detailed information about what is happening and why the user should pay attention to this banner.',
    buttonText: 'Take Action Now',
    onButtonClick: () => {},
  },
};

export const InteractiveExample: Story = {
  render: () => {
    const [showBanner, setShowBanner] = useState(true);

    if (!showBanner) {
      return (
        <button
          onClick={() => setShowBanner(true)}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4A90E2',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Show Banner
        </button>
      );
    }

    return (
      <div style={{ width: '300px' }}>
        <Banner
          type="accent"
          icon="notifications"
          title="New Update Available"
          description="A new version is ready to install."
          buttonText="Update Now"
          onButtonClick={() => setShowBanner(false)}
        />
      </div>
    );
  },
};
