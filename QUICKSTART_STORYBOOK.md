# Storybook Quick Start Guide

## 🚀 Start Storybook

```bash
npm run storybook
```

Storybook will open at **http://localhost:6006/**

## ✅ What's Included

### All 41 Components with Stories:
- Avatar, Badge, Banner, Button, Checkbox, Clickable, Container
- DateRangeInput, Dropdown, EmailInput, FieldInput, FileUpload
- FormFieldError, FormInput, FormInputGroup, FormSection
- Icon, ImageCropperModal, Input, Layout, Loader, Logo
- Modal, ModalContainer, NavigationLink, OverflowMenu
- PasswordInput, PhoneInput, PriceInput, Radio, RatingScoreDot
- ScrollToTop, SegmentedControl, SmsCodeInput, StarRating
- Tag, Text, Toast, ToastContainer, Toggle

### Features:
✅ Interactive prop controls
✅ Live component preview
✅ Auto-generated documentation
✅ Multiple variants per component
✅ TypeScript support
✅ SCSS modules
✅ Next.js compatibility (mocked)

## 📖 Browse Components

In Storybook sidebar, navigate through:
```
Components/
├── Avatar
├── Badge
├── Banner
├── Button
├── Checkbox
└── ... (all 41 components)
```

## 🎨 Try Interactive Controls

Each story has controls in the bottom panel:
- Change props in real-time
- See component updates immediately
- Test different states and variants
- Copy code examples

## 🔧 Configuration Files

### Storybook Config
- `.storybook/main.ts` - Webpack & build config
- `.storybook/preview.ts` - Global settings

### Mocks
- `.storybook/mocks/next-*.js` - Next.js mocks
- `.storybook/mocks/app-dependencies.ts` - App mocks

### Babel
- `.babelrc.json` - TypeScript transpilation

## 📝 Story Format

Each component story follows this pattern:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import ComponentName from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    // component props
  },
};
```

## 🐛 Troubleshooting

### If Storybook doesn't start:
```bash
# Clear cache
rm -rf node_modules/.cache

# Reinstall dependencies
npm install

# Try again
npm run storybook
```

### Check for errors:
```bash
# Run with debug
npm run storybook -- --debug-webpack
```

## 📦 Build Static Storybook

```bash
npm run build-storybook
```

Outputs to `storybook-static/` directory.

## 🎯 Next Steps

1. **Explore all components** - Browse through the sidebar
2. **Test interactions** - Use the controls panel
3. **Copy code examples** - Use the docs tab
4. **Customize stories** - Edit `.stories.tsx` files
5. **Add new stories** - Follow existing patterns

## 💡 Tips

- **Keyboard shortcuts**: Press `?` in Storybook to see all shortcuts
- **Search**: Press `/` to quickly find components
- **Fullscreen**: Press `F` to toggle fullscreen mode
- **Docs**: Each component has auto-generated documentation

## ✨ Quality Standards

All stories follow:
- **DRY** - Reusable patterns
- **SOLID** - Clean architecture
- **YAGNI** - No over-engineering
- **KISS** - Simple, clear code

---

**Ready to explore! 🎉** Run `npm run storybook` and start browsing your UI components.
