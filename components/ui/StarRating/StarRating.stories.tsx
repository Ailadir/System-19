import type { Meta, StoryObj } from '@storybook/react';
import StarRating from './StarRating';

const meta: Meta<typeof StarRating> = {
  title: 'Components/StarRating',
  component: StarRating,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    rating: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
      description: 'Rating value (0-5)',
    },
    reviewCount: {
      control: 'number',
      description: 'Number of reviews',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StarRating>;

export const Default: Story = {
  args: {
    rating: 4,
    reviewCount: 127,
  },
};

export const AllRatings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <StarRating rating={5} reviewCount={42} />
      <StarRating rating={4} reviewCount={89} />
      <StarRating rating={3} reviewCount={156} />
      <StarRating rating={2} reviewCount={23} />
      <StarRating rating={1} reviewCount={5} />
      <StarRating rating={0} reviewCount={0} />
    </div>
  ),
};

export const NoReviews: Story = {
  args: {
    rating: 0,
    reviewCount: 0,
  },
};

export const SingleReview: Story = {
  args: {
    rating: 5,
    reviewCount: 1,
  },
};

export const TwoReviews: Story = {
  args: {
    rating: 4,
    reviewCount: 2,
  },
};

export const ManyReviews: Story = {
  args: {
    rating: 4.5,
    reviewCount: 1523,
  },
};

export const UndefinedRating: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <StarRating rating={undefined as any} reviewCount={undefined as any} />
      <StarRating rating={null as any} reviewCount={null as any} />
      <StarRating rating={0} reviewCount={undefined} />
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div style={{
      width: '300px',
      padding: '24px',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      backgroundColor: 'white',
    }}>
      <div style={{ marginBottom: '16px' }}>
        <img
          src="https://via.placeholder.com/250x150"
          alt="Product"
          style={{ width: '100%', borderRadius: '8px' }}
        />
      </div>
      <h3 style={{ margin: '0 0 8px 0' }}>Product Name</h3>
      <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
        Brief product description goes here
      </p>
      <StarRating rating={4.5} reviewCount={256} />
      <div style={{ marginTop: '16px', fontSize: '24px', fontWeight: 'bold' }}>
        $49.99
      </div>
    </div>
  ),
};

export const RussianPlurals: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>1 review (отзыв):</p>
        <StarRating rating={5} reviewCount={1} />
      </div>
      <div>
        <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>2-4 reviews (отзыва):</p>
        <StarRating rating={4} reviewCount={3} />
      </div>
      <div>
        <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>5+ reviews (отзывов):</p>
        <StarRating rating={4.5} reviewCount={127} />
      </div>
    </div>
  ),
};

export const ComparisonList: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {[
        { name: 'Product A', rating: 4.8, reviews: 342 },
        { name: 'Product B', rating: 4.5, reviews: 189 },
        { name: 'Product C', rating: 4.2, reviews: 567 },
        { name: 'Product D', rating: 3.9, reviews: 94 },
        { name: 'Product E', rating: 4.7, reviews: 221 },
      ].map((product) => (
        <div
          key={product.name}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
          }}
        >
          <span style={{ fontWeight: 600 }}>{product.name}</span>
          <StarRating rating={product.rating} reviewCount={product.reviews} />
        </div>
      ))}
    </div>
  ),
};
