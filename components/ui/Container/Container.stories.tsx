import type { Meta, StoryObj } from '@storybook/react';
import Container from './Container';

const meta: Meta<typeof Container> = {
  title: 'Components/Container',
  component: Container,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    borderRadius: {
      control: 'select',
      options: ['0', '8', '12', '16', '24', '48', '100'],
      description: 'Border radius of the container',
    },
    bgColor: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'transparent'],
      description: 'Background color of the container',
    },
    padding: {
      control: 'select',
      options: ['8', '12', '16', '24', '32'],
      description: 'Padding inside the container',
    },
    margin: {
      control: 'select',
      options: ['auto', 'noMargin'],
      description: 'Margin behavior of the container',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    children: <div style={{ padding: '20px' }}>Container Content</div>,
    borderRadius: '48',
    bgColor: 'secondary',
  },
};

export const AllBackgroundColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Container bgColor="primary" padding="24">
        <p>Primary Background</p>
      </Container>
      <Container bgColor="secondary" padding="24">
        <p>Secondary Background</p>
      </Container>
      <Container bgColor="accent" padding="24">
        <p style={{ color: 'white' }}>Accent Background</p>
      </Container>
      <Container bgColor="transparent" padding="24">
        <p>Transparent Background</p>
      </Container>
    </div>
  ),
};

export const AllBorderRadius: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Container borderRadius="0" bgColor="secondary" padding="24">
        <p>Border Radius: 0</p>
      </Container>
      <Container borderRadius="8" bgColor="secondary" padding="24">
        <p>Border Radius: 8</p>
      </Container>
      <Container borderRadius="16" bgColor="secondary" padding="24">
        <p>Border Radius: 16</p>
      </Container>
      <Container borderRadius="24" bgColor="secondary" padding="24">
        <p>Border Radius: 24</p>
      </Container>
      <Container borderRadius="48" bgColor="secondary" padding="24">
        <p>Border Radius: 48</p>
      </Container>
      <Container borderRadius="100" bgColor="secondary" padding="24">
        <p>Border Radius: 100 (Circle)</p>
      </Container>
    </div>
  ),
};

export const AllPaddingSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Container bgColor="secondary" padding="8">
        <p>Padding: 8px</p>
      </Container>
      <Container bgColor="secondary" padding="12">
        <p>Padding: 12px</p>
      </Container>
      <Container bgColor="secondary" padding="16">
        <p>Padding: 16px</p>
      </Container>
      <Container bgColor="secondary" padding="24">
        <p>Padding: 24px</p>
      </Container>
      <Container bgColor="secondary" padding="32">
        <p>Padding: 32px</p>
      </Container>
    </div>
  ),
};

export const WithClickHandler: Story = {
  render: () => {
    const handleClick = () => alert('Container clicked!');
    return (
      <Container
        bgColor="secondary"
        borderRadius="24"
        padding="24"
        onClick={handleClick}
      >
        <p style={{ cursor: 'pointer' }}>Click me!</p>
      </Container>
    );
  },
};

export const FitWidth: Story = {
  render: () => (
    <div>
      <Container bgColor="secondary" borderRadius="24" padding="24" fitWidth>
        <p>This container fits its content width</p>
      </Container>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Container bgColor="secondary" borderRadius="24" padding="24" fullWidth>
      <p>This container spans full width</p>
    </Container>
  ),
};

export const MarginVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <p style={{ marginBottom: '8px' }}>Auto Margin (Centered):</p>
        <Container bgColor="secondary" borderRadius="24" padding="24" margin="auto">
          <p>Centered Container</p>
        </Container>
      </div>
      <div>
        <p style={{ marginBottom: '8px' }}>No Margin:</p>
        <Container bgColor="secondary" borderRadius="24" padding="24" margin="noMargin">
          <p>No Margin Container</p>
        </Container>
      </div>
    </div>
  ),
};

export const Card: Story = {
  render: () => (
    <Container bgColor="secondary" borderRadius="24" padding="24" fitWidth>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={{ margin: 0 }}>Card Title</h3>
        <p style={{ margin: 0, color: '#666' }}>
          This is a card component built using the Container component.
        </p>
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <button style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#4A90E2',
            color: 'white',
            cursor: 'pointer',
          }}>
            Action
          </button>
          <button style={{
            padding: '8px 16px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}>
            Cancel
          </button>
        </div>
      </div>
    </Container>
  ),
};

export const NestedContainers: Story = {
  render: () => (
    <Container bgColor="primary" borderRadius="24" padding="24">
      <h3 style={{ marginTop: 0 }}>Outer Container</h3>
      <Container bgColor="secondary" borderRadius="16" padding="16">
        <p style={{ margin: 0 }}>Inner Container</p>
      </Container>
    </Container>
  ),
};
