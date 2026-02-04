import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Logo from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'URL or path to the logo image',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the logo',
    },
    width: {
      control: 'number',
      description: 'Width of the logo',
    },
    height: {
      control: 'number',
      description: 'Height of the logo',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    src: 'https://via.placeholder.com/143x48/4A90E2/FFFFFF?text=Logo',
    alt: 'Company Logo',
    width: 143,
    height: 48,
  },
};

export const CustomSize: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Logo
        src="https://via.placeholder.com/100x40/4A90E2/FFFFFF?text=Small"
        alt="Small Logo"
        width={100}
        height={40}
      />
      <Logo
        src="https://via.placeholder.com/143x48/4A90E2/FFFFFF?text=Medium"
        alt="Medium Logo"
        width={143}
        height={48}
      />
      <Logo
        src="https://via.placeholder.com/200x60/4A90E2/FFFFFF?text=Large"
        alt="Large Logo"
        width={200}
        height={60}
      />
    </div>
  ),
};

export const Clickable: Story = {
  render: () => {
    const [clicks, setClicks] = useState(0);
    return (
      <div>
        <Logo
          src="https://via.placeholder.com/143x48/4A90E2/FFFFFF?text=Click+Me"
          alt="Clickable Logo"
          onClick={() => setClicks((c) => c + 1)}
        />
        <p style={{ marginTop: '16px' }}>Clicks: {clicks}</p>
      </div>
    );
  },
};

export const DifferentShapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Logo
        src="https://via.placeholder.com/48x48/4A90E2/FFFFFF?text=Square"
        alt="Square Logo"
        width={48}
        height={48}
      />
      <Logo
        src="https://via.placeholder.com/143x48/4A90E2/FFFFFF?text=Rectangle"
        alt="Rectangle Logo"
        width={143}
        height={48}
      />
      <Logo
        src="https://via.placeholder.com/200x48/4A90E2/FFFFFF?text=Wide"
        alt="Wide Logo"
        width={200}
        height={48}
      />
    </div>
  ),
};
