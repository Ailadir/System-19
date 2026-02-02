/**
 * Shared Size Mappings
 *
 * Single source of truth for size-to-variant conversions across components.
 * Eliminates duplicate mapping objects and ensures consistency.
 */

import type { IconSizeType } from '@/ui/Icon';
import type { TextVariant } from '@/ui/Text';

export type ButtonSizeType = 'xsmall' | 'small' | 'medium' | 'large';
export type InputSizeType = 'xsmall' | 'small' | 'medium' | 'large';

/**
 * Button size to Text variant mapping
 */
export const SIZE_MAPPINGS = {
  buttonToText: {
    xsmall: 'p5',
    small: 'p4',
    medium: 'p3',
    large: 'p2',
  } as const satisfies Record<ButtonSizeType, TextVariant>,

  buttonToIcon: {
    xsmall: 'xsmall',
    small: 'small',
    medium: 'medium',
    large: 'large',
  } as const satisfies Record<ButtonSizeType, IconSizeType>,

  inputToHint: {
    xsmall: 'p6',
    small: 'p6',
    medium: 'p5',
    large: 'p5',
  } as const satisfies Record<InputSizeType, TextVariant>,
} as const;

/**
 * Get Text variant for Button size
 *
 * @param size - Button size
 * @returns Corresponding Text variant
 *
 * @example
 * ```tsx
 * const textVariant = getTextVariantForSize('medium'); // Returns 'p3'
 * ```
 */
export function getTextVariantForSize(size: ButtonSizeType): TextVariant {
  return SIZE_MAPPINGS.buttonToText[size];
}

/**
 * Get Icon size for Button size
 *
 * @param size - Button size
 * @returns Corresponding Icon size
 *
 * @example
 * ```tsx
 * const iconSize = getIconSizeForButtonSize('large'); // Returns 'large'
 * ```
 */
export function getIconSizeForButtonSize(size: ButtonSizeType): IconSizeType {
  return SIZE_MAPPINGS.buttonToIcon[size];
}

/**
 * Get hint text variant for Input size
 *
 * @param size - Input size
 * @returns Corresponding Text variant for hint text
 *
 * @example
 * ```tsx
 * const hintVariant = getHintVariantForSize('medium'); // Returns 'p5'
 * ```
 */
export function getHintVariantForSize(size: InputSizeType): TextVariant {
  return SIZE_MAPPINGS.inputToHint[size];
}
