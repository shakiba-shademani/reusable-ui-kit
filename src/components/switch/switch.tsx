import { clsx } from 'clsx'
import { useId, useMemo, useState, type ChangeEvent } from 'react'

import type { SwitchProps } from './switch.types'

export function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  onChange,
  label,
  disabled = false,
  className,
  labelClassName,
  dir = 'rtl',
  name,
  register,
  registerOptions,
}: SwitchProps) {
  const autoId = useId()
  const isControlled = checked !== undefined
  const [uncontrolled, setUncontrolled] = useState(defaultChecked)
  const isOn = isControlled ? Boolean(checked) : uncontrolled

  const registerBinding = useMemo(() => {
    if (!register || !name) return null
    return register(name, registerOptions)
  }, [register, name, registerOptions])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.checked
    if (!isControlled) setUncontrolled(next)
    onCheckedChange?.(next)
    onChange?.(next)
    registerBinding?.onChange(event)
  }

  return (
    <label
      dir={dir}
      htmlFor={autoId}
      className={clsx(
        'inline-flex cursor-pointer items-center gap-2',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      <span dir="ltr" className="relative inline-flex h-6 w-11 shrink-0 items-center">
        <input
          id={autoId}
          type="checkbox"
          role="switch"
          className="peer absolute inset-0 z-10 m-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          checked={isControlled ? isOn : undefined}
          defaultChecked={!isControlled && !registerBinding ? defaultChecked : undefined}
          disabled={disabled}
          name={registerBinding?.name ?? name}
          ref={registerBinding?.ref}
          onBlur={registerBinding?.onBlur}
          onChange={handleChange}
        />
        <span
          className={clsx(
            'pointer-events-none absolute inset-0 rounded-full transition-colors',
            isOn ? 'bg-ruk-primary' : 'bg-ruk-field-border',
          )}
          aria-hidden="true"
        />
        <span
          className={clsx(
            'pointer-events-none absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform',
            isOn ? 'translate-x-[22px]' : 'translate-x-0.5',
          )}
          aria-hidden="true"
        />
      </span>

      {label ? (
        <span className={clsx('text-sm font-medium text-ruk-text', labelClassName)}>
          {label}
        </span>
      ) : null}
    </label>
  )
}
