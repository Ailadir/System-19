import type { Meta, StoryObj } from '@storybook/react';
import { BaseFormInput } from './BaseFormInput';
import { FormProvider, useForm } from 'react-hook-form';

const meta: Meta<typeof BaseFormInput> = {
  title: 'Components/Form/BaseFormInput',
  component: BaseFormInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BaseFormInput>;

export const Default: Story = {
  render: () => {
    const methods = useForm({
      defaultValues: { email: '' },
    });

    return (
      <FormProvider {...methods}>
        <form style={{ width: '300px' }}>
          <BaseFormInput
            name="email"
            label="Email Address"
            rules={{ required: 'Email is required' }}
          >
            {(field, error) => (
              <div>
                <input
                  {...field}
                  type="email"
                  placeholder="Enter email"
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: `1px solid ${error ? '#f44336' : '#ccc'}`,
                  }}
                />
              </div>
            )}
          </BaseFormInput>
        </form>
      </FormProvider>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const methods = useForm({
      defaultValues: { username: '' },
    });

    return (
      <FormProvider {...methods}>
        <form style={{ width: '300px' }}>
          <BaseFormInput
            name="username"
            label="Username"
            rules={{
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters',
              },
            }}
          >
            {(field, error) => (
              <input
                {...field}
                placeholder="Enter username"
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: `1px solid ${error ? '#f44336' : '#ccc'}`,
                }}
              />
            )}
          </BaseFormInput>
          <button
            onClick={methods.handleSubmit((data) => alert(JSON.stringify(data)))}
            type="button"
            style={{
              marginTop: '16px',
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#4A90E2',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        </form>
      </FormProvider>
    );
  },
};

export const MultipleFields: Story = {
  render: () => {
    const methods = useForm({
      defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
      },
    });

    return (
      <FormProvider {...methods}>
        <form style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <BaseFormInput
            name="firstName"
            label="First Name"
            rules={{ required: 'First name is required' }}
          >
            {(field, error) => (
              <input
                {...field}
                placeholder="John"
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: `1px solid ${error ? '#f44336' : '#ccc'}`,
                }}
              />
            )}
          </BaseFormInput>

          <BaseFormInput
            name="lastName"
            label="Last Name"
            rules={{ required: 'Last name is required' }}
          >
            {(field, error) => (
              <input
                {...field}
                placeholder="Doe"
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: `1px solid ${error ? '#f44336' : '#ccc'}`,
                }}
              />
            )}
          </BaseFormInput>

          <BaseFormInput
            name="email"
            label="Email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
          >
            {(field, error) => (
              <input
                {...field}
                type="email"
                placeholder="john@example.com"
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: `1px solid ${error ? '#f44336' : '#ccc'}`,
                }}
              />
            )}
          </BaseFormInput>

          <button
            onClick={methods.handleSubmit((data) => alert(JSON.stringify(data, null, 2)))}
            type="button"
            style={{
              padding: '12px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#4A90E2',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        </form>
      </FormProvider>
    );
  },
};

export const WithCustomComponent: Story = {
  render: () => {
    const methods = useForm({
      defaultValues: { message: '' },
    });

    return (
      <FormProvider {...methods}>
        <form style={{ width: '400px' }}>
          <BaseFormInput
            name="message"
            label="Message"
            rules={{
              required: 'Message is required',
              maxLength: {
                value: 200,
                message: 'Message must be less than 200 characters',
              },
            }}
          >
            {(field, error) => (
              <textarea
                {...field}
                placeholder="Enter your message"
                rows={4}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: `1px solid ${error ? '#f44336' : '#ccc'}`,
                  fontFamily: 'inherit',
                }}
              />
            )}
          </BaseFormInput>
        </form>
      </FormProvider>
    );
  },
};

export const UsageExample: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h2>BaseFormInput Usage</h2>
      <p>
        BaseFormInput is a wrapper component that eliminates duplicate React Hook Form Controller code.
        It uses the render prop pattern for flexible child rendering.
      </p>
      <pre style={{
        backgroundColor: '#f5f5f5',
        padding: '16px',
        borderRadius: '8px',
        overflow: 'auto',
        fontSize: '14px',
      }}>
        {`<BaseFormInput
  name="email"
  label="Email Address"
  rules={{ required: 'Email is required' }}
>
  {(field, error) => (
    <input
      {...field}
      className={error ? 'error' : ''}
    />
  )}
</BaseFormInput>`}
      </pre>
      <h3>Benefits:</h3>
      <ul>
        <li>DRY: Single source of truth for form field wrapper logic</li>
        <li>Type-safe: Full TypeScript support with generics</li>
        <li>Flexible: Render prop pattern supports any input component</li>
        <li>Consistent: Standardized error handling and validation</li>
      </ul>
    </div>
  ),
};
