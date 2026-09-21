import { clsx } from 'clsx'
import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from 'react'

import type { CounterProps } from './counter.types'

function clamp(value: number, min: number, max?: number) {
  if (max !== undefined) return Math.min(max, Math.max(min, value))
  return Math.max(min, value)
}

export function Counter({
  value,
  defaultValue = 0,
  min = 0,
  max,
  step = 1,
  onChange,
  onChangeValue,
  disabled = false,
  className,
  dir = 'rtl',
  name,
  register,
  registerOptions,
}: CounterProps) {
  const isControlled = value !== undefined
  const [uncontrolled, setUncontrolled] = useState(defaultValue)
  const count = isControlled ? (value as number) : uncontrolled
  const hiddenInputRef = useRef<HTMLInputElement | null>(null)

  const registerBinding = useMemo(() => {
    if (!register || !name) return null
    return register(name, registerOptions)
  }, [register, name, registerOptions])

  const syncHidden = useCallback(
    (next: number) => {
      const input = hiddenInputRef.current
      if (!input || !registerBinding) return
      input.value = String(next)
      registerBinding.onChange({
        target: input,
        currentTarget: input,
        type: 'change',
      } as ChangeEvent<HTMLInputElement>)
    },
    [registerBinding],
  )

  const commit = (next: number) => {
    const clamped = clamp(next, min, max)
    if (!isControlled) setUncontrolled(clamped)
    onChange?.(clamped)
    onChangeValue?.(clamped)
    syncHidden(clamped)
  }

  const setHiddenRef = (node: HTMLInputElement | null) => {
    hiddenInputRef.current = node
    registerBinding?.ref(node)
  }

  return (
    <div
      dir={dir}
      className={clsx('inline-flex items-center gap-3', className)}
    >
      {registerBinding ? (
        <input
          type="hidden"
          name={registerBinding.name}
          ref={setHiddenRef}
          onBlur={registerBinding.onBlur}
          defaultValue={String(count)}
        />
      ) : null}

      <button
        type="button"
        aria-label="کاهش"
        disabled={disabled || count <= min}
        onClick={() => commit(count - step)}
        className={clsx(
          'flex size-[30px] items-center justify-center rounded-full bg-ruk-primary text-sm font-semibold text-black',
          'disabled:cursor-not-allowed disabled:opacity-40',
        )}
      >
        −
      </button>

      <span className="min-w-6 text-center text-sm font-semibold text-ruk-text">
        {count}
      </span>

      <button
        type="button"
        aria-label="افزایش"
        disabled={disabled || (max !== undefined && count >= max)}
        onClick={() => commit(count + step)}
        className={clsx(
          'flex size-[30px] items-center justify-center rounded-full bg-ruk-primary text-sm font-semibold text-black',
          'disabled:cursor-not-allowed disabled:opacity-40',
        )}
      >
        +
      </button>
    </div>
  )
}
