import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import OverflowMenu from './OverflowMenu';

const meta: Meta<typeof OverflowMenu> = {
  title: 'Components/OverflowMenu',
  component: OverflowMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['auto', 'top', 'bottom'],
      description: 'Position of the menu',
    },
  },
};

export default meta;
type Story = StoryObj<typeof OverflowMenu>;

export const Default: Story = {
  render: () => {
    const [lastAction, setLastAction] = useState('');

    return (
      <div>
        <OverflowMenu
          menuItems={[
            { name: 'Edit', onClick: () => setLastAction('Edit clicked') },
            { name: 'Duplicate', onClick: () => setLastAction('Duplicate clicked') },
            { name: 'Delete', onClick: () => setLastAction('Delete clicked') },
          ]}
        >
          <button
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              backgroundColor: 'white',
              cursor: 'pointer',
            }}
          >
            Actions ▼
          </button>
        </OverflowMenu>
        {lastAction && <p style={{ marginTop: '16px' }}>{lastAction}</p>}
      </div>
    );
  },
};

export const WithDivider: Story = {
  render: () => (
    <OverflowMenu
      menuItems={[
        { name: 'View' },
        { name: 'Edit' },
        { name: 'divider' },
        { name: 'Delete' },
      ]}
    >
      <button
        style={{
          padding: '8px 16px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          backgroundColor: 'white',
          cursor: 'pointer',
        }}
      >
        Options ▼
      </button>
    </OverflowMenu>
  ),
};

export const WithRoutes: Story = {
  render: () => (
    <OverflowMenu
      menuItems={[
        { name: 'Profile', route: '/profile' },
        { name: 'Settings', route: '/settings' },
        { name: 'divider' },
        { name: 'Logout', onClick: () => alert('Logout clicked') },
      ]}
    >
      <button
        style={{
          padding: '8px 16px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          backgroundColor: 'white',
          cursor: 'pointer',
        }}
      >
        Account ▼
      </button>
    </OverflowMenu>
  ),
};

export const MobileDesktopMenus: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <p style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
        Resize the viewport to see different menu items on mobile vs desktop
      </p>
      <OverflowMenu
        menuItems={[
          { name: 'Desktop Action 1' },
          { name: 'Desktop Action 2' },
        ]}
        mobileMenuItems={[
          { name: 'Mobile Action 1' },
          { name: 'Mobile Action 2' },
          { name: 'Mobile Action 3' },
        ]}
      >
        <button
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            backgroundColor: 'white',
            cursor: 'pointer',
          }}
        >
          Responsive Menu ▼
        </button>
      </OverflowMenu>
    </div>
  ),
};

export const IconButton: Story = {
  render: () => (
    <OverflowMenu
      menuItems={[
        { name: 'Share' },
        { name: 'Copy link' },
        { name: 'divider' },
        { name: 'Report' },
      ]}
    >
      <button
        style={{
          padding: '8px',
          borderRadius: '50%',
          border: '1px solid #ccc',
          backgroundColor: 'white',
          cursor: 'pointer',
          fontSize: '20px',
        }}
      >
        ⋮
      </button>
    </OverflowMenu>
  ),
};

export const WithOpenChange: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <OverflowMenu
          menuItems={[
            { name: 'Action 1' },
            { name: 'Action 2' },
            { name: 'Action 3' },
          ]}
          onOpenChange={setIsOpen}
        >
          <button
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              backgroundColor: 'white',
              cursor: 'pointer',
            }}
          >
            Menu {isOpen ? '▲' : '▼'}
          </button>
        </OverflowMenu>
        <p style={{ marginTop: '16px' }}>
          Menu is: <strong>{isOpen ? 'Open' : 'Closed'}</strong>
        </p>
      </div>
    );
  },
};

export const CardMenu: Story = {
  render: () => (
    <div
      style={{
        width: '300px',
        padding: '16px',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        backgroundColor: 'white',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <h3 style={{ margin: '0 0 8px 0' }}>Card Title</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Card description with some content
          </p>
        </div>
        <OverflowMenu
          menuItems={[
            { name: 'Edit' },
            { name: 'Share' },
            { name: 'divider' },
            { name: 'Delete' },
          ]}
        >
          <button
            style={{
              padding: '4px 8px',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              fontSize: '20px',
            }}
          >
            ⋮
          </button>
        </OverflowMenu>
      </div>
    </div>
  ),
};

export const TableRowMenu: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {['Item 1', 'Item 2', 'Item 3'].map((item) => (
            <tr key={item} style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px' }}>{item}</td>
              <td style={{ padding: '12px' }}>Active</td>
              <td style={{ padding: '12px' }}>
                <OverflowMenu
                  menuItems={[
                    { name: 'View' },
                    { name: 'Edit' },
                    { name: 'divider' },
                    { name: 'Delete' },
                  ]}
                >
                  <button
                    style={{
                      padding: '4px 8px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                    }}
                  >
                    ⋮
                  </button>
                </OverflowMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

export const MultipleMenus: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {['Menu 1', 'Menu 2', 'Menu 3', 'Menu 4'].map((menu) => (
        <OverflowMenu
          key={menu}
          menuItems={[
            { name: 'Action 1' },
            { name: 'Action 2' },
            { name: 'Action 3' },
          ]}
        >
          <button
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              backgroundColor: 'white',
              cursor: 'pointer',
            }}
          >
            {menu} ▼
          </button>
        </OverflowMenu>
      ))}
    </div>
  ),
};
