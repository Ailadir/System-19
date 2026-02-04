import type { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from './PasswordInput';
import { FormProvider, useForm } from 'react-hook-form';

const meta: Meta<typeof PasswordInput> = {
  title: 'Components/Form/PasswordInput',
  component: PasswordInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  render: () => {
    const methods = useForm({ defaultValues: { password: '' } });
    return (
      <FormProvider {...methods}>
        <div style={{ width: '300px' }}>
          <PasswordInput
            name="password"
            placeholder="Enter password"
          />
        </div>
      </FormProvider>
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const methods = useForm({ defaultValues: { password: '' } });
    return (
      <FormProvider {...methods}>
        <div style={{ width: '300px' }}>
          <PasswordInput
            name="password"
            label="Password"
            placeholder="Enter your password"
          />
        </div>
      </FormProvider>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const methods = useForm({ defaultValues: { password: '' } });
    return (
      <FormProvider {...methods}>
        <form style={{ width: '300px' }}>
          <PasswordInput
            name="password"
            label="Password"
            placeholder="Enter password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'Password must contain uppercase, lowercase, and number',
              },
            }}
          />
          <button
            type="submit"
            onClick={methods.handleSubmit((data) => alert('Form submitted!'))}
            style={{
              marginTop: '16px',
              padding: '12px',
              width: '100%',
              borderRadius: '8px',
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

export const PasswordConfirmation: Story = {
  render: () => {
    const methods = useForm({
      defaultValues: { password: '', confirmPassword: '' },
    });
    const { watch } = methods;

    return (
      <FormProvider {...methods}>
        <form style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <PasswordInput
            name="password"
            label="New Password"
            placeholder="Enter password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Must be at least 8 characters',
              },
            }}
          />
          <PasswordInput
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm password"
            rules={{
              required: 'Please confirm your password',
              validate: (value: string) =>
                value === watch('password') || 'Passwords do not match',
            }}
          />
          <button
            type="submit"
            onClick={methods.handleSubmit((data) =>
              alert('Passwords match! Form submitted.')
            )}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#4A90E2',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Change Password
          </button>
        </form>
      </FormProvider>
    );
  },
};

export const WithVisibilityToggle: Story = {
  render: () => {
    const methods = useForm({ defaultValues: { password: 'ExamplePassword123' } });
    return (
      <FormProvider {...methods}>
        <div style={{ width: '300px' }}>
          <PasswordInput
            name="password"
            label="Password"
          />
          <p style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>
            Click the eye icon to toggle password visibility
          </p>
        </div>
      </FormProvider>
    );
  },
};

export const RegistrationForm: Story = {
  render: () => {
    const methods = useForm({
      defaultValues: {
        email: '',
        password: '',
        confirmPassword: '',
      },
    });
    const { watch } = methods;

    return (
      <FormProvider {...methods}>
        <form
          style={{
            width: '350px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '24px',
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
          }}
        >
          <h2 style={{ margin: '0 0 8px 0' }}>Create Account</h2>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Email</label>
            <input
              {...methods.register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email',
                },
              })}
              type="email"
              placeholder="user@example.com"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />
          </div>

          <PasswordInput
            name="password"
            label="Password"
            placeholder="Create a password"
            rules={{
              required: 'Password is required',
              minLength: { value: 8, message: 'Min 8 characters' },
            }}
          />

          <PasswordInput
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            rules={{
              required: 'Please confirm password',
              validate: (value: string) =>
                value === watch('password') || 'Passwords must match',
            }}
          />

          <button
            type="submit"
            onClick={methods.handleSubmit((data) =>
              alert('Account created successfully!')
            )}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#4A90E2',
              color: 'white',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            Register
          </button>
        </form>
      </FormProvider>
    );
  },
};
