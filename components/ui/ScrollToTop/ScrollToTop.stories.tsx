import type { Meta, StoryObj } from '@storybook/react';
import ScrollToTop from './ScrollToTop';

const meta: Meta<typeof ScrollToTop> = {
  title: 'Components/ScrollToTop',
  component: ScrollToTop,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScrollToTop>;

export const Default: Story = {
  render: () => (
    <div style={{ minHeight: '200vh', padding: '20px' }}>
      <ScrollToTop />
      <h1>Scroll Behavior Component</h1>
      <p>
        This component automatically scrolls to the top of the page on route changes.
        It&apos;s a utility component that doesn&apos;t render any visible content.
      </p>
      <div style={{ marginTop: '40px' }}>
        <h2>How it works:</h2>
        <ul>
          <li>Monitors route changes via Next.js usePathname</li>
          <li>Prevents scroll restoration</li>
          <li>Forcefully scrolls to top on route change</li>
          <li>Temporarily disables scrolling during the operation</li>
          <li>Useful for single-page applications with client-side routing</li>
        </ul>
      </div>
      <div style={{ marginTop: '100vh' }}>
        <p>Scroll down to see more content...</p>
      </div>
      <div style={{ marginTop: '50vh' }}>
        <p>End of content</p>
      </div>
    </div>
  ),
};

export const UsageExample: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Usage Example</h2>
      <pre style={{
        backgroundColor: '#f5f5f5',
        padding: '16px',
        borderRadius: '8px',
        overflow: 'auto',
      }}>
        {`import ScrollToTop from '@/components/ui/ScrollToTop';

function Layout({ children }) {
  return (
    <>
      <ScrollToTop />
      <main>{children}</main>
    </>
  );
}`}
      </pre>
      <div style={{ marginTop: '24px' }}>
        <h3>When to use:</h3>
        <ul>
          <li>Root layout of your Next.js application</li>
          <li>When you want consistent scroll behavior across routes</li>
          <li>To prevent scroll position persistence between pages</li>
        </ul>
      </div>
      <div style={{ marginTop: '24px' }}>
        <h3>Important notes:</h3>
        <ul>
          <li>This component returns null - it doesn&apos;t render anything</li>
          <li>It should be placed once in your app, typically in the root layout</li>
          <li>Works with Next.js App Router (uses usePathname hook)</li>
          <li>Temporarily disables scrolling to ensure scroll reaches top</li>
        </ul>
      </div>
    </div>
  ),
};
