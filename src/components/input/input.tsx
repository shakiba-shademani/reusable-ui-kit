import { clsx } from 'clsx'
import {
  forwardRef,
  useId,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type FocusEvent,
} from 'react'

import { digitsOnly, formatInputValue, stripBidiMarks } from '../../utils/format-input-value'
import { toPersianLetter } from '../../utils/to-persian-letter'
import type { InputProps } from './input.types'

const RLM = '\u200F'
const LRI = '\u2066'
const PDI = '\u2069'

/** Keep numeric values/placeholders sitting on the right in RTL. */
function toRtlVisual(value: string, isolateLtr: boolean) {
  if (!value) return value
  const body = isolateLtr ? `${LRI}${value}${PDI}` : value
  return `${RLM}${body}`
}

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
      onFocus,
      onBlur,
      inputMode,
      placeholder,
      variant = 'default',
      labelMode = 'float',
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
    const [focused, setFocused] = useState(false)

    const displayValue = isControlled
      ? formatInputValue(value, formatOptions)
      : uncontrolledValue

    const message = error ?? helperText
    const isInvalid = Boolean(error)
    const hasValue = String(displayValue ?? '').length > 0
    const isOutlined = variant === 'outlined'
    const labelFloated =
      isOutlined &&
      Boolean(label) &&
      (labelMode === 'fixed' || focused || hasValue)
    const hideStackedLabel = isOutlined
    const hidePlaceholderWhileLabelInside =
      isOutlined && Boolean(label) && !labelFloated
    const numericField = onlyNumber || amount || cardNo
    const rtlNumeric = dir === 'rtl' && numericField
    const visualValue = rtlNumeric
      ? toRtlVisual(displayValue, cardNo)
      : displayValue
    const visualPlaceholder =
      hidePlaceholderWhileLabelInside || !placeholder
        ? undefined
        : rtlNumeric
          ? toRtlVisual(placeholder, cardNo)
          : placeholder

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
      commitValue(
        formatInputValue(stripBidiMarks(event.target.value), formatOptions),
        event,
      )
    }

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault()

      let nextValue = formatInputValue(
        stripBidiMarks(event.clipboardData.getData('text')),
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

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      setFocused(true)
      onFocus?.(event)
    }

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      setFocused(false)
      onBlur?.(event)
    }

    return (
      <div
        dir={dir}
        className={clsx(
          'ruk-input flex w-full max-w-[320px] flex-col gap-2',
          isOutlined && 'pt-2',
          className,
        )}
      >
        {label && !hideStackedLabel ? (
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
            'group relative flex items-center overflow-visible rounded-ruk border border-solid transition-[border-color] duration-150',
            isOutlined && 'h-10',
            disabled
              ? isOutlined
                ? 'cursor-not-allowed border-ruk-field-border bg-ruk-bg'
                : 'cursor-not-allowed border-ruk-border bg-ruk-bg-disabled'
              : isInvalid
                ? 'border-ruk-error bg-ruk-bg'
                : clsx(
                    'bg-ruk-bg',
                    forceHover
                      ? isOutlined
                        ? 'border-ruk-field-border-hover'
                        : 'border-ruk-border-hover'
                      : isOutlined
                        ? 'border-ruk-field-border hover:border-ruk-field-border-hover focus-within:border-ruk-field-border-hover'
                        : 'border-ruk-border hover:border-ruk-border-hover focus-within:border-ruk-border-hover',
                  ),
          )}
        >
          {icon ? (
            <span
              className={clsx(
                // `start` = right edge in RTL — matches Figma icon placement
                'pointer-events-none absolute start-3 top-1/2 z-10 flex size-6 -translate-y-1/2 items-center justify-center',
                disabled
                  ? isOutlined
                    ? 'text-ruk-field-disabled-fg'
                    : 'text-ruk-text-disabled'
                  : isOutlined
                    ? 'text-black'
                    : 'text-ruk-icon',
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
            placeholder={visualPlaceholder}
            inputMode={
              inputMode ?? (numericField ? 'numeric' : undefined)
            }
            className={clsx(
              'w-full rounded-ruk border-0 bg-transparent text-right outline-none',
              rtlNumeric && '[unicode-bidi:isolate] placeholder:text-right',
              isOutlined
                ? 'h-full px-2 text-sm leading-6 tracking-[-0.25px]'
                : clsx(
                    'text-base leading-6',
                    'px-(--spacing-ruk-field-x) py-(--spacing-ruk-field-y)',
                  ),
              'placeholder:text-ruk-text-muted',
              disabled
                ? isOutlined
                  ? 'cursor-not-allowed text-ruk-field-disabled-fg placeholder:text-ruk-field-disabled-fg'
                  : 'cursor-not-allowed text-ruk-text-disabled placeholder:text-ruk-text-disabled'
                : 'text-ruk-text',
              icon && (isOutlined ? 'ps-10' : 'ps-11'),
            )}
            value={visualValue}
            onChange={handleChange}
            onPaste={handlePaste}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {isOutlined && label ? (
            <label
              htmlFor={inputId}
              className={clsx(
                'pointer-events-none absolute z-10 m-0 text-right whitespace-nowrap transition-[top,inset-inline-start,font-size,line-height,font-weight,padding,background-color] duration-150',
                disabled ? 'text-ruk-field-disabled-fg' : 'text-black',
                labelFloated
                  ? 'start-[11px] top-0 -translate-y-1/2 bg-ruk-bg px-1 text-[8px] font-bold leading-[1.4]'
                  : clsx(
                      'top-1/2 -translate-y-1/2 truncate text-sm font-normal leading-6',
                      icon ? 'start-10' : 'start-2',
                      'end-2',
                    ),
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
