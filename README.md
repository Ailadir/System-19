# Osnova Detstva UI Kit

Production-grade React component library with 43 generic, reusable UI components.

## Overview

Clean, generic UI component library featuring production-ready components built with React 19, TypeScript, and SCSS Modules. All business-specific components removed for maximum reusability.

## Features

- 43 generic, reusable UI components
- TypeScript-first with strict mode
- 112+ tree-shakable icon exports
- WCAG compliant with ARIA attributes
- Mobile-first responsive design
- Framework-agnostic architecture
- Production-ready and battle-tested

## Component Categories

### Core UI (4)

- **Button** - Variants, sizes, icons, loading states
- **Input** - Validation, sizes, icons
- **Text** - Typography system (h1-h8, p1-p6)
- **Icon** - 112+ SVG icons with type safety

### Form Controls (5)

- **Dropdown** - Searchable dropdown select
- **Checkbox** - Checkbox with validation
- **Radio** - Radio button groups
- **Toggle** - Toggle switch
- **SegmentedControl** - Tabs/segmented control

### Form Components (6)

- **BaseFormInput** - Shared form wrapper
- **FormFieldError** - Standardized error display
- **FormInput** - Form-integrated input
- **FormInputGroup** - Input grouping
- **FormSection** - Form section wrapper
- **FieldInput** - Generic field wrapper

### Specialized Inputs (6)

- **PhoneInput** - Phone masking with react-imask
- **EmailInput** - Email validation
- **PasswordInput** - Password with visibility toggle
- **PriceInput** - Currency/price input
- **SmsCodeInput** - SMS code verification
- **DateRangeInput** - Date range picker

### File Upload (2)

- **FileUpload** - Drag-and-drop file upload
- **ImageCropperModal** - Image cropping with react-easy-crop

### Layout & Container (4)

- **Layout** - Full-width responsive layout
- **Container** - Styled item container
- **Modal** - Base modal with animations
- **ModalContainer** - Modal management

### Navigation (4)

- **NavigationLink** - Link component
- **Clickable** - Clickable wrapper
- **ScrollToTop** - Scroll-to-top button
- **OverflowMenu** - Overflow menu/dropdown

### Feedback & Status (4)

- **Loader** - Loading spinner
- **Toast** - Toast notifications
- **ToastContainer** - Toast management
- **Banner** - Banner component

### Display Components (6)

- **Avatar** - User avatar
- **Logo** - Logo component
- **Bagde** - Badge component
- **Tag** - Tag/label
- **StarRating** - Star rating display
- **RatingScoreDot** - Rating dot indicator

### Utilities (1)

- **ClientOnly** - Client-side only wrapper

## Design System

### Size System

Consistent sizing across all components:

- `xsmall` - Extra small (compact)
- `small` - Small
- `medium` - Default
- `large` - Large

### Color System

Semantic color tokens:

- `primary` - Main brand color (#f96032)
- `secondary` - Supporting elements
- `tertiary` - Subtle elements
- `accent` - Highlights
- `critical` - Errors (#e54545)
- `success` - Success states (#3d995c)
- `warning` - Warnings (#ff9900)

### Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1365px
- **Desktop:** 1366px - 1919px
- **Wide Desktop:** ≥ 1920px

## Installation

```bash
npm install @osnova-detstva/ui-kit
# or
yarn add @osnova-detstva/ui-kit
```

## Usage

### Import Components

```tsx
import { Button, Input, Icon, Text } from "@osnova-detstva/ui-kit";

function MyComponent() {
  return (
    <>
      <Button variant="primary" size="medium" leftIcon="add">
        Add Item
      </Button>
      <Input
        name="email"
        placeholder="Enter email"
        leftIcon="mail"
        size="medium"
      />
    </>
  );
}
```

### Icons (Tree-shakable)

```tsx
// Method 1: Icon component
import { Icon } from "@osnova-detstva/ui-kit";
<Icon icon="search" size="medium" color="primary" />;

// Method 2: Direct import (smaller bundle)
import { search, add, close } from "@osnova-detstva/ui-kit/icons";
<search className="icon" />;
```

### Responsive Design

```tsx
import { useBreakpoint } from "@osnova-detstva/ui-kit";

function ResponsiveComponent() {
  const breakpoint = useBreakpoint();

  return (
    <Text variant={breakpoint === "mobile" ? "h3" : "h1"}>
      Responsive Title
    </Text>
  );
}
```

## Type Safety

Full TypeScript support with exported types:

```tsx
import type {
  ButtonProps,
  InputProps,
  IconType,
  TextVariant,
  DropdownSizeType,
} from "@osnova-detstva/ui-kit";
```

## Utilities & Hooks

### Hooks

- `useBreakpoint` - Responsive breakpoint detection
- `useClickOutside` - Click outside detection

### Utilities

- `classNameHelpers` - Type-safe className generation
- `sizeMapping` - Centralized size mappings

## Icon System

**112+ SVG Icons** organized by category:

- **Navigation:** arrows, chevrons, menu, home
- **Actions:** add, edit, delete, check, close
- **Communication:** mail, call, chat, notifications
- **Media:** play, pause, stop, volume controls
- **Social:** telegram, vk, dzen
- **Status:** verified, star, warning, info
- **And more...**

All icons are type-safe and tree-shakable.

## Component Architecture

### File Structure

```
ComponentName/
├── ComponentName.tsx          # Implementation
├── ComponentName.types.ts     # TypeScript types
├── ComponentName.module.scss  # Styles (CSS Modules)
└── index.ts                   # Exports
```

### TypeScript Patterns

- Discriminated unions for complex props
- Strict mode enabled
- Zero `any` types
- Generic utilities

### SCSS Modules

- Semantic design tokens
- Responsive mixins
- CSS Modules for isolation
- Mobile-first approach

## Storybook

Interactive component documentation available:

```bash
npm run storybook
```

Features:

- Live component playground
- Auto-generated props documentation
- Accessibility testing
- Responsive preview

## Development

### Scripts

```bash
npm run storybook         # Start Storybook dev server
npm run build-storybook   # Build static Storybook
npm run build             # Build library for production
npm run clean             # Remove build artifacts
```

### Requirements

- React 18+ or 19+
- TypeScript 5.7+
- SCSS support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

**Peer Dependencies:**

- react: ^18.0.0 || ^19.0.0
- react-dom: ^18.0.0 || ^19.0.0
- clsx: ^2.0.0

**Included:**

- imask: ^7.6.1 (phone masking)
- react-imask: ^7.6.1
- react-easy-crop: ^5.5.6 (image cropping)
- react-hook-form: ^7.66.0 (form handling)

## Quality Standards

**Code Quality:**

- TypeScript strict mode
- 100% type coverage
- ESLint configured
- Prettier formatting
- Zero business logic

**Production Ready:**

- Comprehensive error handling
- Performance optimized
- Bundle size conscious
- Accessibility compliant

## License

MIT

---

**Built with:** React 19, TypeScript 5.7, SCSS Modules
**Architecture:** Feature-Sliced Design principles
**Status:** Production-ready, actively maintained
