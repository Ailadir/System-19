import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Tag from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large', 'minSmall'],
      description: 'Size of the tag',
    },
    borderType: {
      control: 'select',
      options: ['round', 'square'],
      description: 'Border style of the tag',
    },
    selected: {
      control: 'boolean',
      description: 'Whether the tag is selected',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    children: 'Tag',
    borderType: 'square',
    size: 'medium',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Tag size="minSmall">MinSmall</Tag>
      <Tag size="xsmall">XSmall</Tag>
      <Tag size="small">Small</Tag>
      <Tag size="medium">Medium</Tag>
      <Tag size="large">Large</Tag>
    </div>
  ),
};

export const BorderTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Tag borderType="square">Square</Tag>
      <Tag borderType="round">Round</Tag>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Tag leftIcon="tag" size="medium">Tagged</Tag>
      <Tag leftIcon="category" size="medium">Category</Tag>
      <Tag leftIcon="label" size="medium">Label</Tag>
    </div>
  ),
};

export const Clickable: Story = {
  render: () => {
    const [clicked, setClicked] = useState('');
    return (
      <div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Tag onClick={() => setClicked('Tag 1')}>Tag 1</Tag>
          <Tag onClick={() => setClicked('Tag 2')}>Tag 2</Tag>
          <Tag onClick={() => setClicked('Tag 3')}>Tag 3</Tag>
        </div>
        {clicked && <p>Last clicked: {clicked}</p>}
      </div>
    );
  },
};

export const SelectedState: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Tag selected={false}>Not Selected</Tag>
      <Tag selected>Selected</Tag>
    </div>
  ),
};

export const InteractiveSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    const tags = ['React', 'TypeScript', 'Next.js', 'Storybook', 'CSS'];

    return (
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {tags.map((tag) => (
          <Tag
            key={tag}
            selected={selected.includes(tag)}
            onClick={() => {
              setSelected((prev) =>
                prev.includes(tag)
                  ? prev.filter((t) => t !== tag)
                  : [...prev, tag]
              );
            }}
          >
            {tag}
          </Tag>
        ))}
      </div>
    );
  },
};

export const ComplexContent: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Tag leftIcon="star" iconColor="accent" size="large" borderType="round">
        Featured
      </Tag>
      <Tag leftIcon="trending_up" iconColor="success" size="medium">
        Trending
      </Tag>
    </div>
  ),
};
