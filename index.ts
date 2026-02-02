// Main component library entry point
// Generic, reusable UI components only

// Core UI Components
export { default as Button } from './components/ui/Button';
export { default as Input } from './components/ui/Input';
export { default as Text } from './components/ui/Text';
export { default as Icon } from './components/ui/Icon';

// Form Controls
export { default as Dropdown } from './components/ui/Dropdown';
export { default as Checkbox } from './components/ui/Checkbox';
export { default as Radio } from './components/ui/Radio';
export { default as Toggle } from './components/ui/Toggle';
export { default as SegmentedControl } from './components/ui/SegmentedControl';

// Form Components
export { default as BaseFormInput } from './components/ui/BaseFormInput';
export { default as FormFieldError } from './components/ui/FormFieldError';
export { default as FormInput } from './components/ui/FormInput';
export { default as FormInputGroup } from './components/ui/FormInputGroup';
export { default as FormSection } from './components/ui/FormSection';
export { default as FieldInput } from './components/ui/FieldInput';

// Specialized Inputs
export { default as PhoneInput } from './components/ui/PhoneInput';
export { default as EmailInput } from './components/ui/EmailInput';
export { default as PasswordInput } from './components/ui/PasswordInput';
export { default as PriceInput } from './components/ui/PriceInput';
export { default as SmsCodeInput } from './components/ui/SmsCodeInput';
export { default as DateRangeInput } from './components/ui/DateRangeInput';

// File Upload
export { default as FileUpload } from './components/ui/FileUpload';
export { default as ImageCropperModal } from './components/ui/ImageCropperModal';

// Layout & Container
export { default as Layout } from './components/ui/Layout';
export { default as Container } from './components/ui/Container';
export { default as Modal } from './components/ui/Modal';
export { default as ModalContainer } from './components/ui/ModalContainer';

// Navigation
export { default as NavigationLink } from './components/ui/NavigationLink';
export { default as Clickable } from './components/ui/Clickable';
export { default as ScrollToTop } from './components/ui/ScrollToTop';
export { default as OverflowMenu } from './components/ui/OverflowMenu';

// Feedback & Status
export { default as Loader } from './components/ui/Loader';
export { default as Toast } from './components/ui/Toast';
export { default as ToastContainer } from './components/ui/ToastContainer';
export { default as Banner } from './components/ui/Banner';

// Display Components
export { default as Avatar } from './components/ui/Avatar';
export { default as Logo } from './components/ui/Logo';
export { default as Bagde } from './components/ui/Bagde';
export { default as Tag } from './components/ui/Tag';
export { default as StarRating } from './components/ui/StarRating';
export { default as RatingScoreDot } from './components/ui/RatingScoreDot';

// Type Exports - Core Components
export type { ButtonProps, ButtonSizeType, ButtonVariant } from './components/ui/Button/Button.types';
export type { InputProps, InputSizeType } from './components/ui/Input/Input.types';
export type { IconProps, IconType, IconsType } from './components/ui/Icon/Icon.types';
export type { TextProps, TextVariant, TextWeight, TextColor } from './components/ui/Text/Text.types';

// Type Exports - Form Components
export type { DropdownProps, DropdownSizeType } from './components/ui/Dropdown/Dropdown.types';
export type { CheckboxProps } from './components/ui/Checkbox/Checkbox.types';
export type { RadioProps } from './components/ui/Radio/Radio.types';
export type { ToggleProps } from './components/ui/Toggle/Toggle.types';

// Type Exports - Layout Components
export type { LayoutProps } from './components/ui/Layout/Layout.types';
export type { ContainerProps } from './components/ui/Container/Container.types';
export type { ModalProps } from './components/ui/Modal/Modal.types';

// Type Exports - Other
export type { LoaderProps } from './components/ui/Loader/Loader.types';
export type { BannerProps } from './components/ui/Banner/Banner.types';
export type { StarRatingProps } from './components/ui/StarRating/StarRating.types';
export type { Toast, ToastButton } from './components/ui/Toast/Toast.types';
export type { ToastContainerProps } from './components/ui/ToastContainer/ToastContainer';
export type { ModalData } from './components/ui/ModalContainer/ModalContainer.types';
export type { ModalContainerProps } from './components/ui/ModalContainer/ModalContainer';
export type { LogoProps } from './components/ui/Logo/Logo';

// Icons (standalone exports - tree-shakable)
export * from './icons';

// Utilities
export * from './utils/utils/classNameHelpers';

// Constants
export * from './config/constants/sizeMapping';

// Hooks
export { default as useBreakpoint } from './hooks/useBreakpoint';
export { default as useClickOutside } from './hooks/useClickOutside';
