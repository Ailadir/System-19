import type { Meta, StoryObj } from '@storybook/react';
import { FormInput } from './FormInput';
import { FormProvider, useForm } from 'react-hook-form';

const meta: Meta<typeof FormInput> = {
  title: 'Components/Form/FormInput',
  component: FormInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormInput>;

export const Default: Story = {
  render: () => {
    const methods = useForm({ defaultValues: { username: '' } });
    return (
      <FormProvider {...methods}>
        <div style={{ width: '300px' }}>
          <FormInput
            name="username"
            label="Username"
            placeholder="Enter username"
          />
        </div>
      </FormProvider>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const methods = useForm({ defaultValues: { email: '' } });
    return (
      <FormProvider {...methods}>
        <form style={{ width: '300px' }}>
          <FormInput
            name="email"
            label="Email Address"
            type="email"
            placeholder="user@example.com"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email format',
              },
            }}
          />
          <button
            type="submit"
            onClick={methods.handleSubmit((data) => alert(JSON.stringify(data)))}
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

export const CompleteForm: Story = {
  render: () => {
    const methods = useForm({
      defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        website: '',
      },
    });

    return (
      <FormProvider {...methods}>
        <form
          style={{
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '24px',
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
          }}
        >
          <h2 style={{ margin: '0 0 8px 0' }}>Contact Form</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <FormInput
              name="firstName"
              label="First Name"
              placeholder="John"
              rules={{ required: 'Required' }}
            />
            <FormInput
              name="lastName"
              label="Last Name"
              placeholder="Doe"
              rules={{ required: 'Required' }}
            />
          </div>

          <FormInput
            name="email"
            label="Email"
            type="email"
            placeholder="john@example.com"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email',
              },
            }}
          />

          <FormInput
            name="phone"
            label="Phone"
            type="tel"
            placeholder="+1 234 567 8900"
          />

          <FormInput
            name="website"
            label="Website"
            type="url"
            placeholder="https://example.com"
          />

          <button
            type="submit"
            onClick={methods.handleSubmit((data) =>
              alert(`Form submitted!\n${JSON.stringify(data, null, 2)}`)
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
            Submit
          </button>
        </form>
      </FormProvider>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const methods = useForm({ defaultValues: { search: '' } });
    return (
      <FormProvider {...methods}>
        <div style={{ width: '300px' }}>
          <FormInput
            name="search"
            label="Search"
            placeholder="Search..."
            leftIcon="search"
            isRound
          />
        </div>
      </FormProvider>
    );
  },
};

export const DifferentTypes: Story = {
  render: () => {
    const methods = useForm({
      defaultValues: {
        text: '',
        email: '',
        password: '',
        number: '',
        url: '',
        tel: '',
      },
    });

    return (
      <FormProvider {...methods}>
        <div style={{ width: '350px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <FormInput name="text" label="Text" type="text" placeholder="Text input" />
          <FormInput name="email" label="Email" type="email" placeholder="email@example.com" />
          <FormInput name="password" label="Password" type="password" placeholder="••••••••" />
          <FormInput name="number" label="Number" type="number" placeholder="123" />
          <FormInput name="url" label="URL" type="url" placeholder="https://example.com" />
          <FormInput name="tel" label="Telephone" type="tel" placeholder="+1 234 567 8900" />
        </div>
      </FormProvider>
    );
  },
};
