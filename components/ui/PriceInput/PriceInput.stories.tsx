import type { Meta, StoryObj } from '@storybook/react';
import { PriceInput } from './PriceInput';
import { FormProvider, useForm } from 'react-hook-form';

const meta: Meta<typeof PriceInput> = {
  title: 'Components/Form/PriceInput',
  component: PriceInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PriceInput>;

export const Default: Story = {
  render: () => {
    const methods = useForm({ defaultValues: { price: undefined } });
    return (
      <FormProvider {...methods}>
        <div style={{ width: '300px' }}>
          <PriceInput name="price" placeholder="0" />
        </div>
      </FormProvider>
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const methods = useForm({ defaultValues: { price: undefined } });
    return (
      <FormProvider {...methods}>
        <div style={{ width: '300px' }}>
          <PriceInput
            name="price"
            label="Price (RUB)"
            placeholder="Enter price"
          />
        </div>
      </FormProvider>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const methods = useForm({ defaultValues: { price: undefined } });
    return (
      <FormProvider {...methods}>
        <form style={{ width: '300px' }}>
          <PriceInput
            name="price"
            label="Product Price"
            rules={{
              required: 'Price is required',
              min: {
                value: 1,
                message: 'Price must be greater than 0',
              },
            }}
          />
          <button
            type="submit"
            onClick={methods.handleSubmit((data) =>
              alert(`Price: ${data.price} RUB`)
            )}
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

export const Prefilled: Story = {
  render: () => {
    const methods = useForm({
      defaultValues: { price: 15000 },
    });
    return (
      <FormProvider {...methods}>
        <div style={{ width: '300px' }}>
          <PriceInput name="price" label="Price" />
          <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
            Value is formatted with thousand separators
          </p>
        </div>
      </FormProvider>
    );
  },
};

export const LargeNumbers: Story = {
  render: () => {
    const methods = useForm({
      defaultValues: { price: 1234567890 },
    });
    return (
      <FormProvider {...methods}>
        <div style={{ width: '300px' }}>
          <PriceInput name="price" label="Price (Large Number)" />
        </div>
      </FormProvider>
    );
  },
};

export const RoundedVariant: Story = {
  render: () => {
    const methods = useForm({ defaultValues: { price: 5000 } });
    return (
      <FormProvider {...methods}>
        <div style={{ width: '300px' }}>
          <PriceInput
            name="price"
            label="Price (Rounded)"
            isRound
          />
        </div>
      </FormProvider>
    );
  },
};

export const PricingForm: Story = {
  render: () => {
    const methods = useForm({
      defaultValues: {
        basePrice: undefined,
        discount: undefined,
      },
    });
    const { watch } = methods;
    const basePrice = watch('basePrice') || 0;
    const discount = watch('discount') || 0;
    const finalPrice = basePrice - discount;

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
          <h2 style={{ margin: '0 0 8px 0' }}>Product Pricing</h2>

          <PriceInput
            name="basePrice"
            label="Base Price"
            rules={{
              required: 'Base price is required',
              min: { value: 1, message: 'Price must be positive' },
            }}
          />

          <PriceInput
            name="discount"
            label="Discount Amount"
          />

          <div
            style={{
              padding: '16px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              marginTop: '8px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Base Price:</span>
              <strong>{basePrice.toLocaleString('ru-RU')} ₽</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#f44336' }}>
              <span>Discount:</span>
              <strong>-{discount.toLocaleString('ru-RU')} ₽</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '2px solid #ccc', fontSize: '18px' }}>
              <span>Final Price:</span>
              <strong style={{ color: '#4CAF50' }}>{finalPrice.toLocaleString('ru-RU')} ₽</strong>
            </div>
          </div>

          <button
            type="submit"
            onClick={methods.handleSubmit((data) =>
              alert(`Pricing saved:\nBase: ${data.basePrice}\nDiscount: ${data.discount}`)
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
            Save Pricing
          </button>
        </form>
      </FormProvider>
    );
  },
};
