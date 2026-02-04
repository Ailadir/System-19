import type { Meta, StoryObj } from '@storybook/react';
import Layout from './Layout';

const meta: Meta<typeof Layout> = {
  title: 'Components/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    bgColor: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'transparent'],
      description: 'Background color of the layout',
    },
    tag: {
      control: 'select',
      options: ['main', 'section', 'div', 'article', 'aside'],
      description: 'HTML semantic tag to use',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Default Layout</h1>
        <p>This is the default layout with transparent background</p>
      </div>
    ),
    bgColor: 'transparent',
  },
};

export const AllBackgroundColors: Story = {
  render: () => (
    <div>
      <Layout bgColor="primary">
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2>Primary Background</h2>
        </div>
      </Layout>
      <Layout bgColor="secondary">
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2>Secondary Background</h2>
        </div>
      </Layout>
      <Layout bgColor="accent">
        <div style={{ padding: '40px', textAlign: 'center', color: 'white' }}>
          <h2>Accent Background</h2>
        </div>
      </Layout>
      <Layout bgColor="transparent">
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2>Transparent Background</h2>
        </div>
      </Layout>
    </div>
  ),
};

export const SemanticTags: Story = {
  render: () => (
    <div>
      <Layout tag="main" bgColor="primary">
        <div style={{ padding: '20px' }}>
          <h2>Main Element</h2>
          <p>Using semantic &lt;main&gt; tag</p>
        </div>
      </Layout>
      <Layout tag="section" bgColor="secondary">
        <div style={{ padding: '20px' }}>
          <h2>Section Element</h2>
          <p>Using semantic &lt;section&gt; tag</p>
        </div>
      </Layout>
      <Layout tag="article" bgColor="transparent">
        <div style={{ padding: '20px' }}>
          <h2>Article Element</h2>
          <p>Using semantic &lt;article&gt; tag</p>
        </div>
      </Layout>
      <Layout tag="aside" bgColor="secondary">
        <div style={{ padding: '20px' }}>
          <h2>Aside Element</h2>
          <p>Using semantic &lt;aside&gt; tag</p>
        </div>
      </Layout>
    </div>
  ),
};

export const FullPageLayout: Story = {
  render: () => (
    <Layout tag="main" bgColor="primary">
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header style={{ padding: '20px', backgroundColor: 'rgba(0,0,0,0.05)' }}>
          <h1>Website Header</h1>
        </header>
        <div style={{ flex: 1, padding: '40px' }}>
          <h2>Main Content Area</h2>
          <p>This layout component provides full-width page structure with responsive padding.</p>
        </div>
        <footer style={{ padding: '20px', backgroundColor: 'rgba(0,0,0,0.05)' }}>
          <p>Website Footer</p>
        </footer>
      </div>
    </Layout>
  ),
};

export const SectionLayouts: Story = {
  render: () => (
    <div>
      <Layout tag="section" bgColor="primary">
        <div style={{ padding: '60px 0', textAlign: 'center' }}>
          <h2>Hero Section</h2>
          <p>Welcome to our website</p>
        </div>
      </Layout>
      <Layout tag="section" bgColor="secondary">
        <div style={{ padding: '60px 0', textAlign: 'center' }}>
          <h2>Features Section</h2>
          <p>Our amazing features</p>
        </div>
      </Layout>
      <Layout tag="section" bgColor="accent">
        <div style={{ padding: '60px 0', textAlign: 'center', color: 'white' }}>
          <h2>Call to Action</h2>
          <p>Get started today!</p>
        </div>
      </Layout>
    </div>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <Layout tag="main" bgColor="secondary">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h1>Page Title</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '24px' }}>
          <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px' }}>
            <h3>Card 1</h3>
            <p>Content for first card</p>
          </div>
          <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px' }}>
            <h3>Card 2</h3>
            <p>Content for second card</p>
          </div>
          <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px' }}>
            <h3>Card 3</h3>
            <p>Content for third card</p>
          </div>
        </div>
      </div>
    </Layout>
  ),
};

export const ResponsivePadding: Story = {
  render: () => (
    <Layout bgColor="primary">
      <div style={{ padding: '20px' }}>
        <h2>Responsive Padding</h2>
        <p>The Layout component automatically applies responsive padding:</p>
        <ul>
          <li>Mobile/Tablet: 8px padding</li>
          <li>Desktop+: 24px padding</li>
        </ul>
        <p>Resize your browser to see the effect.</p>
      </div>
    </Layout>
  ),
};
