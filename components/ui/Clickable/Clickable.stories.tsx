import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Clickable from './Clickable';

const meta: Meta<typeof Clickable> = {
  title: 'Components/Clickable',
  component: Clickable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'URL for navigation',
    },
    blank: {
      control: 'boolean',
      description: 'Open link in new tab',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Clickable>;

export const AsLink: Story = {
  args: {
    href: '/example',
    children: <div style={{ padding: '12px 24px', border: '1px solid #ccc', borderRadius: '8px' }}>Click me (Link)</div>,
  },
};

export const AsButton: Story = {
  render: () => {
    const [clicks, setClicks] = useState(0);
    return (
      <div>
        <Clickable onClick={() => setClicks(c => c + 1)}>
          <div style={{ padding: '12px 24px', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer' }}>
            Click me (Button)
          </div>
        </Clickable>
        <p style={{ marginTop: '16px' }}>Clicks: {clicks}</p>
      </div>
    );
  },
};

export const ExternalLink: Story = {
  args: {
    href: 'https://example.com',
    blank: true,
    children: <div style={{ padding: '12px 24px', border: '1px solid #ccc', borderRadius: '8px' }}>Open in new tab</div>,
  },
};

export const WithComplexContent: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Clickable href="/profile">
        <div style={{
          padding: '16px',
          border: '1px solid #e0e0e0',
          borderRadius: '12px',
          width: '200px',
        }}>
          <h3 style={{ margin: '0 0 8px 0' }}>Profile</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>View your profile</p>
        </div>
      </Clickable>
      <Clickable href="/settings">
        <div style={{
          padding: '16px',
          border: '1px solid #e0e0e0',
          borderRadius: '12px',
          width: '200px',
        }}>
          <h3 style={{ margin: '0 0 8px 0' }}>Settings</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Manage your settings</p>
        </div>
      </Clickable>
    </div>
  ),
};

export const ImageCard: Story = {
  args: {
    href: '/article',
    children: (
      <div style={{
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        overflow: 'hidden',
        width: '300px',
      }}>
        <div style={{
          height: '200px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }} />
        <div style={{ padding: '16px' }}>
          <h3 style={{ margin: '0 0 8px 0' }}>Article Title</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Click to read more about this interesting topic...
          </p>
        </div>
      </div>
    ),
  },
};

export const KeyboardAccessible: Story = {
  render: () => {
    const [focused, setFocused] = useState<string | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Try navigating with Tab key and pressing Enter or Space
        </p>
        <Clickable onClick={() => setFocused('item1')}>
          <div style={{
            padding: '12px 24px',
            border: '2px solid',
            borderColor: focused === 'item1' ? '#4A90E2' : '#ccc',
            borderRadius: '8px',
            cursor: 'pointer',
          }}>
            Item 1
          </div>
        </Clickable>
        <Clickable onClick={() => setFocused('item2')}>
          <div style={{
            padding: '12px 24px',
            border: '2px solid',
            borderColor: focused === 'item2' ? '#4A90E2' : '#ccc',
            borderRadius: '8px',
            cursor: 'pointer',
          }}>
            Item 2
          </div>
        </Clickable>
      </div>
    );
  },
};
