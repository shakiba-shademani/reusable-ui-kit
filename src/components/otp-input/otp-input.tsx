import { clsx } from 'clsx'
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
} from 'react'

import { toEnglishDigits } from '../../utils/to-english-digits'
import type { OtpInputProps } from './otp-input.types'

function onlyDigits(value: string) {
  return toEnglishDigits(value).replace(/\D/g, '')
}

/** Left-align digits into a fixed-length slot array (for external prefills/resets). */
function parseExternalValue(value: string, length: number): string[] {
  const digits = onlyDigits(value).slice(0, length)
  return Array.from({ length }, (_, index) => digits[index] ?? '')
}

export function OtpInput({
  length = 6,
  value,
  defaultValue = '',
  onChange,
  onComplete,
  disabled = false,
  autoFocus = false,
  error = false,
  className,
  name,
  id,
  'aria-label': ariaLabel = 'کد یکبار مصرف',
  ...rest
}: OtpInputProps) {
  const reactId = useId()
  const fieldId = id ?? reactId
  const isControlled = value !== undefined

  const [chars, setChars] = useState<string[]>(() =>
    parseExternalValue(
      (isControlled ? value : defaultValue) ?? '',
      length,
    ),
  )

  // Last compact string we emitted — ignore echo updates from the parent.
  const lastEmittedRef = useRef<string | null>(null)
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    if (!isControlled) return
    if (value === lastEmittedRef.current) return
    lastEmittedRef.current = value ?? ''
    setChars(parseExternalValue(value ?? '', length))
  }, [isControlled, value, length])

  useEffect(() => {
    setChars((prev) => {
      if (prev.length === length) return prev
      return Array.from({ length }, (_, i) => prev[i] ?? '')
    })
  }, [length])

  const commit = (next: string[]) => {
    setChars(next)
    const compact = next.join('')
    lastEmittedRef.current = compact
    onChange?.(compact)
    if (next.every(Boolean)) {
      onComplete?.(compact)
    }
  }

  const focusAt = (index: number) => {
    const el = inputsRef.current[index]
    el?.focus()
    el?.select()
  }

  const writeFrom = (startIndex: number, digits: string) => {
    const next = [...chars]
    for (let i = 0; i < digits.length && startIndex + i < length; i++) {
      next[startIndex + i] = digits[i] ?? ''
    }
    commit(next)
    focusAt(Math.min(startIndex + Math.max(digits.length, 1), length) - 1)
  }

  const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const raw = onlyDigits(event.target.value)

    if (!raw) {
      const next = [...chars]
      next[index] = ''
      commit(next)
      return
    }

    if (raw.length > 1) {
      writeFrom(index, raw)
      return
    }

    const next = [...chars]
    next[index] = raw
    commit(next)
    if (index < length - 1) focusAt(index + 1)
  }

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      if (chars[index]) {
        const next = [...chars]
        next[index] = ''
        commit(next)
        return
      }
      if (index > 0) {
        event.preventDefault()
        const next = [...chars]
        next[index - 1] = ''
        commit(next)
        focusAt(index - 1)
      }
      return
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault()
      focusAt(index - 1)
    }
    if (event.key === 'ArrowRight' && index < length - 1) {
      event.preventDefault()
      focusAt(index + 1)
    }
  }

  const handlePaste = (
    index: number,
    event: ClipboardEvent<HTMLInputElement>,
  ) => {
    event.preventDefault()
    const pasted = onlyDigits(event.clipboardData.getData('text'))
    if (!pasted) return
    writeFrom(index, pasted)
  }

  return (
    <div
      className={clsx('ruk-otp-input flex w-full flex-row justify-center gap-2', className)}
      dir="ltr"
      role="group"
      aria-label={ariaLabel}
    >
      {chars.map((char, index) => (
        <input
          key={`${fieldId}-${index}`}
          {...rest}
          ref={(node) => {
            inputsRef.current[index] = node
          }}
          id={index === 0 ? fieldId : `${fieldId}-${index + 1}`}
          name={index === 0 ? name : undefined}
          type="tel"
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          autoFocus={autoFocus && index === 0}
          disabled={disabled}
          maxLength={1}
          value={char}
          aria-label={`رقم ${index + 1}`}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={(event) => handlePaste(index, event)}
          onFocus={(event) => event.target.select()}
          className={clsx(
            'size-12 shrink-0 rounded-ruk border border-solid bg-ruk-field text-center',
            'text-[19px] font-medium tracking-tight text-ruk-otp-text outline-none transition-[border-color,background-color]',
            disabled && 'cursor-not-allowed opacity-60',
            error
              ? 'border-ruk-error'
              : 'border-ruk-field-border focus:border-ruk-accent-focus',
          )}
        />
      ))}
    </div>
  )
}

OtpInput.displayName = 'OtpInput'
