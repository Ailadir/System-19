import type { Meta, StoryObj } from '@storybook/react';
import { FormFieldError } from './FormFieldError';

const meta: Meta<typeof FormFieldError> = {
  title: 'Components/Form/FormFieldError',
  component: FormFieldError,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large'],
      description: 'Size of the error message',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormFieldError>;

export const Default: Story = {
  args: {
    error: 'This field is required',
    size: 'medium',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>XSmall:</p>
        <FormFieldError error="This field is required" size="xsmall" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Small:</p>
        <FormFieldError error="This field is required" size="small" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Medium:</p>
        <FormFieldError error="This field is required" size="medium" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Large:</p>
        <FormFieldError error="This field is required" size="large" />
      </div>
    </div>
  ),
};

export const DifferentErrors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '400px' }}>
      <FormFieldError error="This field is required" />
      <FormFieldError error="Email format is invalid" />
      <FormFieldError error="Password must be at least 8 characters" />
      <FormFieldError error="Passwords do not match" />
      <FormFieldError error="Please enter a valid phone number" />
    </div>
  ),
};

export const LongErrorMessage: Story = {
  args: {
    error:
      'This is a very long error message that demonstrates how the component handles extensive text content. It should wrap appropriately and maintain readability.',
    size: 'medium',
  },
};

export const NoError: Story = {
  render: () => (
    <div style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
      <p>When there is no error, the component renders nothing:</p>
      <FormFieldError error={undefined} />
      <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
        (No error is displayed above)
      </p>
    </div>
  ),
};

export const WithInput: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <label style={{ display: 'block', marginBottom: '8px' }}>Email Address</label>
      <input
        type="email"
        placeholder="Enter email"
        style={{
          width: '100%',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #f44336',
          marginBottom: '4px',
        }}
      />
      <FormFieldError error="Please enter a valid email address" size="medium" />
    </div>
  ),
};

export const MultipleFields: Story = {
  render: () => (
    <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '8px' }}>Username</label>
        <input
          type="text"
          placeholder="Enter username"
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #f44336',
            marginBottom: '4px',
          }}
        />
        <FormFieldError error="Username is required" size="medium" />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '8px' }}>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #f44336',
            marginBottom: '4px',
          }}
        />
        <FormFieldError error="Email format is invalid" size="medium" />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '8px' }}>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #f44336',
            marginBottom: '4px',
          }}
        />
        <FormFieldError error="Password must be at least 8 characters" size="medium" />
      </div>
    </div>
  ),
};

export const AccessibilityExample: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h3>Accessibility Features</h3>
      <ul>
        <li>Uses <code>role=&quot;alert&quot;</code> for screen reader announcements</li>
        <li>Displays a warning icon for visual indication</li>
        <li>Uses semantic color (red) for error state</li>
        <li>Maintains proper text contrast for readability</li>
      </ul>
      <div style={{ marginTop: '24px', width: '300px' }}>
        <label htmlFor="demo-input" style={{ display: 'block', marginBottom: '8px' }}>
          Demo Field
        </label>
        <input
          id="demo-input"
          type="text"
          aria-invalid="true"
          aria-describedby="demo-error"
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #f44336',
            marginBottom: '4px',
          }}
        />
        <div id="demo-error">
          <FormFieldError error="This field has an error" size="medium" />
        </div>
      </div>
    </div>
  ),
};
