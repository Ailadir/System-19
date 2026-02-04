import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    url: {
      control: 'text',
      description: 'URL of the avatar image',
    },
    displayName: {
      control: 'text',
      description: 'Name of the user for alt text',
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: 'Size of the avatar',
    },
    isRound: {
      control: 'boolean',
      description: 'Whether the avatar is circular',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    url: 'https://i.pravatar.cc/240',
    displayName: 'John Doe',
    size: 'small',
    isRound: true,
  },
};

export const Placeholder: Story = {
  args: {
    url: null,
    displayName: 'John Doe',
    size: 'small',
    isRound: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Avatar
        url="https://i.pravatar.cc/56"
        displayName="Small Avatar"
        size="small"
        isRound
      />
      <Avatar
        url="https://i.pravatar.cc/240"
        displayName="Large Avatar"
        size="large"
        isRound
      />
    </div>
  ),
};

export const ShapeVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Avatar
        url="https://i.pravatar.cc/56"
        displayName="Square Avatar"
        size="small"
        isRound={false}
      />
      <Avatar
        url="https://i.pravatar.cc/56"
        displayName="Round Avatar"
        size="small"
        isRound
      />
    </div>
  ),
};

export const PlaceholderVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Avatar
        url={null}
        displayName="Small Placeholder"
        size="small"
        isRound
      />
      <Avatar
        url={null}
        displayName="Large Placeholder"
        size="large"
        isRound
      />
    </div>
  ),
};

export const CustomIconSize: Story = {
  args: {
    url: null,
    displayName: 'Custom Icon',
    size: 'large',
    isRound: true,
    iconSize: 'xlLarge',
    iconColor: 'secondary',
  },
};
