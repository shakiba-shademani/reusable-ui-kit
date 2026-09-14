import { clsx } from 'clsx'
import {
  forwardRef,
  useId,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
} from 'react'

import { digitsOnly, formatInputValue } from '../../utils/format-input-value'
import { toPersianLetter } from '../../utils/to-persian-letter'
import type { InputProps } from './input.types'

function buildChangeEvent(
  event: ChangeEvent<HTMLInputElement>,
  nextValue: string,
): ChangeEvent<HTMLInputElement> {
  const target = event.target
  target.value = nextValue

  return {
    ...event,
    target,
    currentTarget: target,
  }
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label,
      error,
      helperText,
      icon,
      forceHover = false,
      onlyNumber = false,
      amount = false,
      cardNo = false,
      cardNoSeparator = ' ',
      separator = ',',
      persianLetter = false,
      disabled,
      required,
      className,
      id,
      dir = 'rtl',
      value,
      defaultValue,
      onChange,
      onPaste,
      inputMode,
      ...rest
    },
    ref,
  ) {
    const autoId = useId()
    const inputId = id ?? autoId
    const messageId = `${inputId}-message`
    const amountWordsId = `${inputId}-amount-words`

    const formatOptions = {
      onlyNumber: onlyNumber || amount || cardNo,
      amount,
      cardNo,
      cardNoSeparator,
      separator,
    }

    const isControlled = value !== undefined

    const [uncontrolledValue, setUncontrolledValue] = useState(() =>
      formatInputValue(defaultValue, formatOptions),
    )

    const displayValue = isControlled
      ? formatInputValue(value, formatOptions)
      : uncontrolledValue

    const message = error ?? helperText
    const isInvalid = Boolean(error)

    const amountInWords = (() => {
      if (!amount || !persianLetter) return ''
      const raw = digitsOnly(displayValue)
      if (!raw) return ''
      // Previous DS treated the numeric value as Rials and showed Tomans (÷ 10).
      const toman = Math.floor(Number(raw) / 10)
      const words = toPersianLetter(toman)
      return words ? `${words} تومان` : ''
    })()

    const describedBy =
      [amountInWords ? amountWordsId : null, message ? messageId : null]
        .filter(Boolean)
        .join(' ') || undefined

    const commitValue = (
      nextValue: string,
      event: ChangeEvent<HTMLInputElement>,
    ) => {
      if (!isControlled) {
        setUncontrolledValue(nextValue)
      }
      onChange?.(buildChangeEvent(event, nextValue))
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      commitValue(formatInputValue(event.target.value, formatOptions), event)
    }

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault()

      let nextValue = formatInputValue(
        event.clipboardData.getData('text'),
        formatOptions,
      )

      // Match previous DS: a pasted amount of "0" clears the field.
      if (amount && nextValue === '0') {
        nextValue = ''
      }

      const target = event.target as HTMLInputElement
      const syntheticChange = {
        ...event,
        target,
        currentTarget: target,
      } as unknown as ChangeEvent<HTMLInputElement>

      commitValue(nextValue, syntheticChange)
      onPaste?.(event)
    }

    return (
      <div
        dir={dir}
        className={clsx(
          'ruk-input flex w-full max-w-[320px] flex-col gap-2',
          className,
        )}
      >
        {label ? (
          <label
            htmlFor={inputId}
            className={clsx(
              'm-0 text-right text-sm font-medium leading-5',
              disabled ? 'text-ruk-text-disabled' : 'text-ruk-text',
            )}
          >
            {required ? (
              <span className="ms-1 text-ruk-error" aria-hidden="true">
                *
              </span>
            ) : null}
            {label}
          </label>
        ) : null}

        <div
          className={clsx(
            'group relative flex items-center rounded-ruk border border-solid transition-[border-color] duration-150',
            disabled
              ? 'cursor-not-allowed border-ruk-border bg-ruk-bg-disabled'
              : isInvalid
                ? 'border-ruk-error bg-ruk-bg'
                : clsx(
                    'bg-ruk-bg',
                    forceHover
                      ? 'border-ruk-border-hover'
                      : 'border-ruk-border hover:border-ruk-border-hover focus-within:border-ruk-border-hover',
                  ),
          )}
        >
          {icon ? (
            <span
              className={clsx(
                // `start` = right edge in RTL — matches Figma icon placement
                'pointer-events-none absolute start-3 top-1/2 flex -translate-y-1/2 items-center justify-center',
                disabled ? 'text-ruk-text-disabled' : 'text-ruk-icon',
              )}
            >
              {icon}
            </span>
          ) : null}

          <input
            {...rest}
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            aria-invalid={isInvalid || undefined}
            aria-describedby={describedBy}
            dir={dir}
            inputMode={
              inputMode ??
              (onlyNumber || amount || cardNo ? 'numeric' : undefined)
            }
            className={clsx(
              'w-full rounded-ruk border-0 bg-transparent text-right text-base leading-6 outline-none',
              'px-(--spacing-ruk-field-x) py-(--spacing-ruk-field-y)',
              'placeholder:text-ruk-text-muted',
              disabled
                ? 'cursor-not-allowed text-ruk-text-disabled placeholder:text-ruk-text-disabled'
                : 'text-ruk-text',
              icon && 'ps-11',
            )}
            value={displayValue}
            onChange={handleChange}
            onPaste={handlePaste}
          />
        </div>

        {amountInWords ? (
          <p
            id={amountWordsId}
            className="m-0 text-right text-xs font-medium leading-5 text-ruk-text"
          >
            {amountInWords}
          </p>
        ) : null}

        {message ? (
          <p
            id={messageId}
            role={isInvalid ? 'alert' : undefined}
            className={clsx(
              'm-0 text-right text-sm font-normal leading-5',
              isInvalid ? 'text-ruk-error' : 'text-ruk-text-muted',
            )}
          >
            {message}
          </p>
        ) : null}
      </div>
    )
  },
)

Input.displayName = 'Input'
