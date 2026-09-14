import { clsx } from 'clsx'
import { forwardRef, type MouseEvent } from 'react'

import type { ButtonProps } from './button.types'

const SIZE_WIDTH: Record<NonNullable<ButtonProps['size']>, string> = {
  large: 'w-[330px]',
  medium: 'w-[200px]',
  small: 'w-[161px]',
}

const HEIGHT_CLASS: Record<NonNullable<ButtonProps['height']>, string> = {
  40: 'h-10',
  48: 'h-12',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'filled',
      size = 'large',
      height = 48,
      icon,
      block = false,
      loading = false,
      forceHover = false,
      disabled = false,
      type = 'button',
      dir = 'rtl',
      className,
      children = 'متن',
      onClick,
      ...rest
    },
    ref,
  ) {
    const isDisabled = disabled || loading

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) {
        event.preventDefault()
        return
      }
      onClick?.(event)
    }

    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        dir={dir}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        onClick={handleClick}
        className={clsx(
          'ruk-button relative inline-flex items-center justify-center overflow-hidden',
          'rounded-ruk border border-solid px-2 text-base font-medium leading-[25px]',
          'select-none transition-[background-color,border-color,color] duration-150',
          HEIGHT_CLASS[height],
          block ? 'w-full' : SIZE_WIDTH[size],
          isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
          isDisabled
            ? variant === 'outline'
              ? 'border-ruk-btn-disabled-fg bg-ruk-btn-disabled text-ruk-btn-disabled-fg'
              : 'border-transparent bg-ruk-btn-disabled text-ruk-btn-disabled-fg'
            : variant === 'filled'
              ? clsx(
                  'border-transparent text-black',
                  forceHover
                    ? 'bg-ruk-primary-hover'
                    : 'bg-ruk-primary hover:bg-ruk-primary-hover',
                )
              : clsx(
                  'border-black text-black',
                  forceHover
                    ? 'bg-ruk-btn-outline-hover'
                    : 'bg-transparent hover:bg-ruk-btn-outline-hover',
                ),
          className,
        )}
      >
        <span
          className="relative z-10 inline-flex flex-row items-center justify-center gap-1"
          dir="ltr"
        >
          {loading ? (
            <span
              role="status"
              aria-label="loading"
              className={clsx(
                'inline-block size-[15px] shrink-0 animate-spin rounded-full border-2 border-t-transparent',
                'border-current',
              )}
            />
          ) : null}

          <span dir={dir} className="min-w-0 text-center">
            {children}
          </span>

          {icon && !loading ? (
            <span className="inline-flex size-6 shrink-0 items-center justify-center [&_svg]:size-full">
              {icon}
            </span>
          ) : null}
        </span>
      </button>
    )
  },
)

Button.displayName = 'Button'
