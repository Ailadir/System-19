import type { Meta, StoryObj } from '@storybook/react';
import NavigationLink from './NavigationLink';

const meta: Meta<typeof NavigationLink> = {
  title: 'Components/NavigationLink',
  component: NavigationLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'URL for navigation',
    },
    exactMatch: {
      control: 'boolean',
      description: 'Whether to match the href exactly',
    },
    prefetch: {
      control: 'boolean',
      description: 'Whether to prefetch the link',
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationLink>;

export const Default: Story = {
  args: {
    href: '/about',
    children: 'About',
  },
};

export const WithActiveClass: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <NavigationLink
        href="/"
        activeClassName="active"
        className="nav-link"
      >
        Home
      </NavigationLink>
      <NavigationLink
        href="/about"
        activeClassName="active"
        className="nav-link"
      >
        About
      </NavigationLink>
      <NavigationLink
        href="/contact"
        activeClassName="active"
        className="nav-link"
      >
        Contact
      </NavigationLink>
      <style>{`
        .nav-link {
          padding: 8px 16px;
          text-decoration: none;
          color: #666;
          border-radius: 4px;
        }
        .nav-link.active {
          color: #4A90E2;
          background-color: #E3F2FD;
          font-weight: 600;
        }
      `}</style>
    </div>
  ),
};

export const ExactMatch: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <p style={{ fontSize: '14px', color: '#666' }}>
        Exact match only highlights when path is exactly &quot;/&quot;
      </p>
      <NavigationLink
        href="/"
        exactMatch
        activeClassName="exact-active"
        className="exact-link"
      >
        Home (exact match)
      </NavigationLink>
      <NavigationLink
        href="/about"
        exactMatch
        activeClassName="exact-active"
        className="exact-link"
      >
        About (exact match)
      </NavigationLink>
      <style>{`
        .exact-link {
          padding: 8px 16px;
          text-decoration: none;
          color: #666;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          display: inline-block;
        }
        .exact-link.exact-active {
          color: white;
          background-color: #4A90E2;
          border-color: #4A90E2;
        }
      `}</style>
    </div>
  ),
};

export const NavigationMenu: Story = {
  render: () => (
    <nav style={{
      display: 'flex',
      gap: '8px',
      padding: '12px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
    }}>
      <NavigationLink
        href="/"
        activeClassName="menu-active"
        className="menu-link"
      >
        Dashboard
      </NavigationLink>
      <NavigationLink
        href="/projects"
        activeClassName="menu-active"
        className="menu-link"
      >
        Projects
      </NavigationLink>
      <NavigationLink
        href="/team"
        activeClassName="menu-active"
        className="menu-link"
      >
        Team
      </NavigationLink>
      <NavigationLink
        href="/settings"
        activeClassName="menu-active"
        className="menu-link"
      >
        Settings
      </NavigationLink>
      <style>{`
        .menu-link {
          padding: 8px 16px;
          text-decoration: none;
          color: #666;
          border-radius: 6px;
          transition: all 0.2s;
        }
        .menu-link:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        .menu-link.menu-active {
          color: #4A90E2;
          background-color: white;
          font-weight: 600;
        }
      `}</style>
    </nav>
  ),
};

export const WithInterceptNavigation: Story = {
  render: () => {
    const handleIntercept = (href: string) => {
      alert(`Navigation intercepted to: ${href}`);
    };

    return (
      <div style={{ display: 'flex', gap: '16px' }}>
        <NavigationLink
          href="/page1"
          interceptNavigation={handleIntercept}
        >
          Intercepted Link 1
        </NavigationLink>
        <NavigationLink
          href="/page2"
          interceptNavigation={handleIntercept}
        >
          Intercepted Link 2
        </NavigationLink>
      </div>
    );
  },
};

export const VerticalMenu: Story = {
  render: () => (
    <div style={{
      width: '200px',
      padding: '16px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <NavigationLink
          href="/home"
          activeClassName="vertical-active"
          className="vertical-link"
        >
          Home
        </NavigationLink>
        <NavigationLink
          href="/profile"
          activeClassName="vertical-active"
          className="vertical-link"
        >
          Profile
        </NavigationLink>
        <NavigationLink
          href="/messages"
          activeClassName="vertical-active"
          className="vertical-link"
        >
          Messages
        </NavigationLink>
        <NavigationLink
          href="/notifications"
          activeClassName="vertical-active"
          className="vertical-link"
        >
          Notifications
        </NavigationLink>
      </div>
      <style>{`
        .vertical-link {
          padding: 10px 12px;
          text-decoration: none;
          color: #666;
          border-radius: 6px;
          display: block;
          transition: all 0.2s;
        }
        .vertical-link:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        .vertical-link.vertical-active {
          color: white;
          background-color: #4A90E2;
          font-weight: 600;
        }
      `}</style>
    </div>
  ),
};
