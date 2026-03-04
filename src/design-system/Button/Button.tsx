import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { SpinnerIcon } from '../icons';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Size of the button
   * @default 'medium'
   */
  size?: ButtonSize;

  /**
   * If true, the button will take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Button contents
   */
  children: React.ReactNode;

  /**
   * If true, shows a loading state and disables the button
   * @default false
   */
  loading?: boolean;

  /**
   * Icon to display before the button text
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon to display after the button text
   */
  rightIcon?: React.ReactNode;
}

/**
 * A fully accessible, themeable button component
 *
 * Features:
 * - WCAG 2.1 AA compliant
 * - Keyboard accessible
 * - Screen reader friendly
 * - Theme-aware (light/dark mode)
 * - Multiple variants and sizes
 * - Loading state
 * - Icon support
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="medium" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      className = '',
      children,
      type = 'button',
      'aria-label': ariaLabel,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const classes = classNames(
      styles.button,
      styles[variant],
      styles[size],
      {
        [styles.fullWidth]: fullWidth,
        [styles.loading]: loading,
      },
      className
    );

    const renderSpinner = () => {
      if (!loading) return null;

      return (
        <span className={styles.spinner} data-testid="spinner" aria-hidden="true">
          <SpinnerIcon svgClassName={styles.spinnerSvg} circleClassName={styles.spinnerCircle} />
        </span>
      );
    };

    const renderLeftIcon = () => {
      if (loading || !leftIcon) return null;

      return (
        <span className={styles.icon} aria-hidden="true">
          {leftIcon}
        </span>
      );
    };

    const renderRightIcon = () => {
      if (loading || !rightIcon) return null;

      return (
        <span className={styles.icon} aria-hidden="true">
          {rightIcon}
        </span>
      );
    };

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        aria-label={ariaLabel}
        {...rest}
      >
        {renderSpinner()}
        {renderLeftIcon()}
        <span className={styles.text}>{children}</span>
        {renderRightIcon()}
      </button>
    );
  }
);

Button.displayName = 'Button';
