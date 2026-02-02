import type { Meta, StoryObj } from '@storybook/react';
import Text from './Text';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6'],
      description: 'Text variant (maps to semantic HTML)',
    },
    weight: {
      control: 'select',
      options: ['light', 'regular', 'medium', 'bold', 'black'],
      description: 'Font weight',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'accent', 'critical', 'warning', 'success'],
      description: 'Text color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

// Default text
export const Default: Story = {
  args: {
    variant: 'p3',
    children: 'This is default text',
  },
};

// All heading variants
export const AllHeadings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text variant="h1">Heading 1 - H1 tag</Text>
      <Text variant="h2">Heading 2 - H2 tag</Text>
      <Text variant="h3">Heading 3 - H3 tag</Text>
      <Text variant="h4">Heading 4 - H4 tag</Text>
      <Text variant="h5">Heading 5 - H5 tag</Text>
      <Text variant="h6">Heading 6 - H6 tag</Text>
      <Text variant="h7">Heading 7 - div</Text>
      <Text variant="h8">Heading 8 - div</Text>
    </div>
  ),
};

// All paragraph variants
export const AllParagraphs: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Text variant="p1">Paragraph 1 - Large text</Text>
      <Text variant="p2">Paragraph 2 - Medium-large text</Text>
      <Text variant="p3">Paragraph 3 - Default text</Text>
      <Text variant="p4">Paragraph 4 - Small text</Text>
      <Text variant="p5">Paragraph 5 - Extra small text</Text>
      <Text variant="p6">Paragraph 6 - Tiny text</Text>
    </div>
  ),
};

// All font weights
export const AllWeights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Text variant="p3" weight="light">Light weight (300)</Text>
      <Text variant="p3" weight="regular">Regular weight (400)</Text>
      <Text variant="p3" weight="medium">Medium weight (500)</Text>
      <Text variant="p3" weight="bold">Bold weight (700)</Text>
      <Text variant="p3" weight="black">Black weight (900)</Text>
    </div>
  ),
};

// All colors
export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Text variant="p3" color="primary">Primary color</Text>
      <Text variant="p3" color="secondary">Secondary color</Text>
      <Text variant="p3" color="tertiary">Tertiary color</Text>
      <Text variant="p3" color="accent">Accent color</Text>
      <Text variant="p3" color="critical">Critical color</Text>
      <Text variant="p3" color="warning">Warning color</Text>
      <Text variant="p3" color="success">Success color</Text>
    </div>
  ),
};

// Custom tag override
export const CustomTag: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Text variant="h3" as="span">H3 style but rendered as span</Text>
      <Text variant="p3" as="h1">P3 style but rendered as h1</Text>
    </div>
  ),
};

// Responsive example
export const ResponsiveText: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', padding: '20px' }}>
      <Text variant="h2" weight="bold" color="primary">
        Responsive Typography
      </Text>
      <Text variant="p3" color="secondary" style={{ marginTop: '16px' }}>
        This text component supports responsive design through the variant system.
        Resize your browser to see how text scales properly across different screen sizes.
      </Text>
    </div>
  ),
};
