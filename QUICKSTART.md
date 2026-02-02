# Quick Start Guide - Osnova Detstva UI Kit

## Installation

### 1. Copy the Library

Copy the entire `osnova-detstva-ui-kit` directory to your project:

```bash
cp -r osnova-detstva-ui-kit /path/to/your/project/src/
```

### 2. Install Dependencies

Add these dependencies to your `package.json`:

```json
{
  "dependencies": {
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "next": "^15.3.6",
    "clsx": "^2.1.1",
    "typescript": "^5.7.3"
  },
  "devDependencies": {
    "@svgr/webpack": "^8.1.0",
    "sass": "^1.89.2"
  }
}
```

Then run:
```bash
npm install
```

### 3. Configure Next.js

Update `next.config.js`:

```javascript
const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'node_modules')],
  },
  webpack: (config) => {
    // SVG loader for icons
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};
```

### 4. Configure TypeScript

Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"]
    },
    "strict": true
  }
}
```

## Basic Usage

### Import Components

```tsx
import { Button, Text, Icon, Layout, Container } from '@/osnova-detstva-ui-kit/components/ui';
import { useBreakpoint } from '@/osnova-detstva-ui-kit/hooks/hooks';
```

### Example 1: Simple Button

```tsx
import { Button } from '@/osnova-detstva-ui-kit/components/ui';

export default function MyComponent() {
  return (
    <Button
      variant="primary"
      size="medium"
      onClick={() => console.log('Clicked!')}
    >
      Click Me
    </Button>
  );
}
```

### Example 2: Button with Icon

```tsx
import { Button } from '@/osnova-detstva-ui-kit/components/ui';

export default function MyComponent() {
  return (
    <Button
      variant="primary"
      size="medium"
      leftIcon="arrow_forward"
      iconColor="white"
    >
      Continue
    </Button>
  );
}
```

### Example 3: Responsive Layout

```tsx
import { Layout, Container, Text } from '@/osnova-detstva-ui-kit/components/ui';
import { useBreakpoint } from '@/osnova-detstva-ui-kit/hooks/hooks';

export default function MyPage() {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';

  return (
    <Layout bgColor="primary">
      <Container bgColor="secondary" borderRadius="48">
        <Text variant={isMobile ? 'h3' : 'h1'}>
          Welcome to My App
        </Text>
        <Text variant="p3" color="secondary">
          This is a responsive page using the UI kit
        </Text>
      </Container>
    </Layout>
  );
}
```

### Example 4: Form with Inputs

```tsx
'use client';

import { useState } from 'react';
import { FormInput, Button } from '@/osnova-detstva-ui-kit/components/ui';

export default function MyForm() {
  const [email, setEmail] = useState('');

  return (
    <form>
      <FormInput
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        label="Email Address"
      />

      <Button
        variant="primary"
        size="large"
        type="submit"
        fullWidth
      >
        Submit
      </Button>
    </form>
  );
}
```

### Example 5: Icon System

```tsx
import { Icon } from '@/osnova-detstva-ui-kit/components/ui';

export default function MyComponent() {
  return (
    <div>
      <Icon icon="check" color="success" size="medium" />
      <Icon icon="close" color="critical" size="medium" />
      <Icon icon="info" color="progress" size="large" />
    </div>
  );
}
```

### Example 6: Modal

```tsx
'use client';

import { useState } from 'react';
import { Button, Modal, Text } from '@/osnova-detstva-ui-kit/components/ui';

export default function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="My Modal"
      >
        <Text variant="p3">
          This is modal content
        </Text>
      </Modal>
    </>
  );
}
```

### Example 7: Toast Notifications

```tsx
'use client';

import { Button, ToastContainer } from '@/osnova-detstva-ui-kit/components/ui';
import { useToast } from '@/osnova-detstva-ui-kit/hooks/hooks';

export default function MyComponent() {
  const { showToast } = useToast();

  return (
    <>
      <Button onClick={() => showToast('Success!', 'success')}>
        Show Success Toast
      </Button>

      <Button onClick={() => showToast('Error occurred', 'error')}>
        Show Error Toast
      </Button>

      <ToastContainer />
    </>
  );
}
```

## Using Design Tokens

### In SCSS Files

```scss
@use 'src/osnova-detstva-ui-kit/styles/styles/variables/semanticColors.scss' as *;
@use 'src/osnova-detstva-ui-kit/styles/styles/variables/breakpoints.scss' as *;

.myComponent {
  background-color: $bg-primary;
  color: $text-primary;
  border: 1px solid $border-primary;

  @media (max-width: $tablet-max) {
    padding: 8px;
  }

  @media (min-width: $desktop) {
    padding: 24px;
  }
}
```

### Color System

Available semantic colors:

**Backgrounds:**
- `$bg-primary` (white)
- `$bg-secondary` (light gray)
- `$bg-accent` (brand orange)
- `$bg-progress` (blue)
- `$bg-caution` (orange)
- `$bg-critical` (red)
- `$bg-success` (green)

**Text:**
- `$text-primary` (dark)
- `$text-secondary` (gray)
- `$text-accent` (brand orange)
- `$text-white` (white)

**Borders:**
- `$border-primary`
- `$border-secondary`
- `$border-focus`
- `$border-accent`

## Component Variants

### Button Variants

```tsx
// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>

// Sizes
<Button size="xsmall">XSmall</Button>
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>

// States
<Button isDisabled>Disabled</Button>
<Button isLoading>Loading</Button>
<Button isActive>Active</Button>
<Button fullWidth>Full Width</Button>

// Border types
<Button borderType="square">Square</Button>
<Button borderType="round">Round</Button>
```

### Text Variants

```tsx
// Heading variants (h1-h8)
<Text variant="h1">Heading 1</Text>
<Text variant="h2">Heading 2</Text>
<Text variant="h3">Heading 3</Text>

// Paragraph variants (p1-p6)
<Text variant="p1">Large paragraph</Text>
<Text variant="p3">Medium paragraph</Text>
<Text variant="p6">Small paragraph</Text>

// Weights
<Text variant="h1" weight="bold">Bold</Text>
<Text variant="p3" weight="regular">Regular</Text>

// Colors
<Text variant="p3" color="primary">Primary color</Text>
<Text variant="p3" color="secondary">Secondary color</Text>
<Text variant="p3" color="accent">Accent color</Text>

// Text clamping
<Text variant="p3" clamp={2}>
  This text will be clamped to 2 lines...
</Text>
```

### Icon Variants

```tsx
// Sizes
<Icon icon="check" size="small" />
<Icon icon="check" size="medium" />
<Icon icon="check" size="large" />

// Colors
<Icon icon="check" color="primary" />
<Icon icon="check" color="secondary" />
<Icon icon="check" color="accent" />
<Icon icon="check" color="success" />
<Icon icon="check" color="critical" />
<Icon icon="check" color="white" />

// With click handler
<Icon
  icon="close"
  color="primary"
  onClick={() => console.log('Clicked')}
/>
```

## Available Icons

110+ icons available. Some popular ones:

**Navigation:**
- `arrow_forward`, `arrow_back`, `arrow_upward`, `arrow_downward`
- `chevron_right`, `keyboard_arrow_down`, `keyboard_arrow_up`

**Actions:**
- `add`, `remove`, `edit`, `delete`, `close`
- `check`, `done_all`, `search`, `filter_list`

**Communication:**
- `mail`, `call`, `chat`, `notifications`

**Media:**
- `play-fill`, `pause-fill`, `stop-fill`, `volume-up-fill`

**Status:**
- `verified`, `star`, `warning`, `info`, `priority_high`

**Social:**
- `telegram`, `vk`, `dzen`

**Files:**
- `cloud-arrow-up-fill`, `cloud-arrow-down-fill`, `archive`

## Responsive Hooks

### useBreakpoint

```tsx
import { useBreakpoint } from '@/osnova-detstva-ui-kit/hooks/hooks';

export default function MyComponent() {
  const breakpoint = useBreakpoint();

  // breakpoint: 'mobile' | 'tablet' | 'desktop' | 'wideDesktop'

  const isMobile = breakpoint === 'mobile';
  const isDesktop = breakpoint === 'desktop' || breakpoint === 'wideDesktop';

  return (
    <div>
      {isMobile && <MobileView />}
      {isDesktop && <DesktopView />}
    </div>
  );
}
```

## Common Patterns

### Page Layout Pattern

```tsx
import { Layout, Container, Text, Button } from '@/osnova-detstva-ui-kit/components/ui';

export default function MyPage() {
  return (
    <Layout bgColor="primary" tag="main">
      <Container bgColor="secondary" borderRadius="48" padding="large">
        <Text variant="h1">Page Title</Text>
        <Text variant="p3" color="secondary">
          Page description goes here
        </Text>

        <Button variant="primary" size="large">
          Call to Action
        </Button>
      </Container>
    </Layout>
  );
}
```

### Card Pattern

```tsx
import { Container, Text, Icon, Button } from '@/osnova-detstva-ui-kit/components/ui';

export default function Card() {
  return (
    <Container
      bgColor="secondary"
      borderRadius="24"
      padding="medium"
    >
      <Icon icon="star" color="accent" size="large" />
      <Text variant="h3">Card Title</Text>
      <Text variant="p4" color="secondary">
        Card description text
      </Text>
      <Button variant="ghost" size="small">
        Learn More
      </Button>
    </Container>
  );
}
```

### Form Pattern

```tsx
import {
  FormInput,
  EmailInput,
  PasswordInput,
  Button,
  Container
} from '@/osnova-detstva-ui-kit/components/ui';

export default function LoginForm() {
  return (
    <Container bgColor="primary" borderRadius="48" padding="large">
      <form>
        <EmailInput
          label="Email"
          placeholder="Enter your email"
          required
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          required
        />

        <Button
          variant="primary"
          size="large"
          fullWidth
          type="submit"
        >
          Login
        </Button>
      </form>
    </Container>
  );
}
```

## TypeScript Usage

### Component Props

```tsx
import { ButtonProps, TextProps, IconProps } from '@/osnova-detstva-ui-kit/components/ui';

// Use component props in your own components
interface MyComponentProps {
  button: ButtonProps;
  title: TextProps;
}

export default function MyComponent({ button, title }: MyComponentProps) {
  return (
    <>
      <Text {...title} />
      <Button {...button} />
    </>
  );
}
```

### Custom Types

```tsx
import type { IconType } from '@/osnova-detstva-ui-kit/components/ui/Icon';
import type { BreakpointType } from '@/osnova-detstva-ui-kit/hooks/hooks';

interface MyConfig {
  icon: IconType;
  breakpoint: BreakpointType;
}
```

## Best Practices

1. **Use Semantic Tokens**: Always use semantic color tokens (`$bg-primary`, `$text-accent`) instead of raw colors
2. **Responsive First**: Use `useBreakpoint` hook for conditional rendering
3. **Type Safety**: Leverage TypeScript types for better developer experience
4. **Consistent Spacing**: Use the Container component for consistent spacing
5. **Icon Usage**: Use semantic icon names with appropriate colors
6. **Layout Hierarchy**: Use Layout for page structure, Container for content blocks

## Troubleshooting

### SCSS Import Errors

If you get SCSS import errors, make sure:
1. `sass` is installed
2. `next.config.js` has correct `sassOptions`
3. Path aliases are configured in `tsconfig.json`

### SVG Icon Errors

If icons don't load:
1. Install `@svgr/webpack`
2. Configure webpack in `next.config.js`
3. Restart your dev server

### TypeScript Errors

If you get type errors:
1. Run `npm install` to ensure all types are installed
2. Check `tsconfig.json` has correct paths
3. Restart your TypeScript server

## Next Steps

- Read the full [README.md](./README.md) for comprehensive documentation
- Check [STRUCTURE.md](./STRUCTURE.md) for detailed file organization
- Browse component files for implementation details
- Customize design tokens in `styles/styles/variables/`

## Support

For issues or questions, refer to:
- [README.md](./README.md) - Full documentation
- [STRUCTURE.md](./STRUCTURE.md) - Directory structure
- Component source files - Implementation examples
