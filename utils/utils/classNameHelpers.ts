/**
 * Type-Safe Class Name Helpers
 *
 * Provides type-safe utilities for generating class names based on component props.
 * Eliminates string interpolation and ensures compile-time type checking.
 *
 * Benefits:
 * - Type safety: Invalid size/type values caught at compile time
 * - DRY: Single source of truth for class name mappings
 * - Maintainability: Centralized mapping logic
 */

type InputSizeType = 'xsmall' | 'small' | 'medium' | 'large';
type SemanticType = 'profile' | 'minSmall';
type ValidationState = 'error' | 'success' | 'default';

/**
 * Input size to CSS class name mapping
 */
const INPUT_SIZE_CLASSES = {
  xsmall: 'input-xsmall',
  small: 'input-small',
  medium: 'input-medium',
  large: 'input-large',
} as const satisfies Record<InputSizeType, string>;

/**
 * Semantic type to CSS class name mapping
 */
const SEMANTIC_TYPE_CLASSES = {
  profile: 'profile',
  minSmall: 'minSmall',
} as const satisfies Record<SemanticType, string>;

/**
 * Validation state to CSS class name mapping
 */
const VALIDATION_STATE_CLASSES = {
  error: 'validation-error',
  success: 'validation-success',
  default: '',
} as const satisfies Record<ValidationState, string>;

/**
 * Get type-safe class name for input size
 *
 * @param size - Input size type
 * @param styles - SCSS module styles object
 * @returns Class name from styles object, or undefined if size not provided
 *
 * @example
 * ```tsx
 * const className = getInputSizeClass('medium', s);
 * // Returns: s['input-medium']
 * ```
 */
export function getInputSizeClass(
  size: InputSizeType | undefined,
  styles: Record<string, string>
): string | undefined {
  if (!size) return undefined;
  const className = INPUT_SIZE_CLASSES[size];
  return styles[className];
}

/**
 * Get type-safe class name for semantic type
 *
 * @param semanticType - Semantic type
 * @param styles - SCSS module styles object
 * @returns Class name from styles object, or undefined if type not provided
 *
 * @example
 * ```tsx
 * const className = getSemanticTypeClass('profile', s);
 * // Returns: s['profile']
 * ```
 */
export function getSemanticTypeClass(
  semanticType: SemanticType | undefined,
  styles: Record<string, string>
): string | undefined {
  if (!semanticType) return undefined;
  const className = SEMANTIC_TYPE_CLASSES[semanticType];
  return styles[className];
}

/**
 * Get type-safe class name for validation state
 *
 * @param validationState - Validation state
 * @param styles - SCSS module styles object
 * @returns Class name from styles object, or undefined if default state
 *
 * @example
 * ```tsx
 * const className = getValidationStateClass('error', s);
 * // Returns: s['validation-error']
 * ```
 */
export function getValidationStateClass(
  validationState: ValidationState | undefined,
  styles: Record<string, string>
): string | undefined {
  if (!validationState || validationState === 'default') return undefined;
  const className = VALIDATION_STATE_CLASSES[validationState];
  return styles[className];
}

/**
 * Get default input class when no size or semantic type provided
 *
 * @param size - Input size type
 * @param semanticType - Semantic type
 * @param styles - SCSS module styles object
 * @returns Default class name, or undefined if size or semantic type provided
 *
 * @example
 * ```tsx
 * const className = getDefaultInputClass(undefined, undefined, s);
 * // Returns: s['default']
 * ```
 */
export function getDefaultInputClass(
  size: InputSizeType | undefined,
  semanticType: SemanticType | undefined,
  styles: Record<string, string>
): string | undefined {
  if (size || semanticType) return undefined;
  return styles.default;
}
