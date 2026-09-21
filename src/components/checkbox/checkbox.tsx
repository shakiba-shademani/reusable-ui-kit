import { clsx } from 'clsx'
import {
  useId,
  useMemo,
  useState,
  type ChangeEvent,
} from 'react'

import { CheckIcon } from '../../icons/check-icon'
import type { CheckboxProps } from './checkbox.types'

export function Checkbox({
  label,
  checked,
  defaultChecked = false,
  onCheckedChange,
  onChange,
  disabled = false,
  className,
  dir = 'rtl',
  name,
  id,
  register,
  registerOptions,
  ...rest
}: CheckboxProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const isControlled = checked !== undefined
  const [uncontrolled, setUncontrolled] = useState(defaultChecked)
  const isChecked = isControlled ? Boolean(checked) : uncontrolled

  const registerBinding = useMemo(() => {
    if (!register || !name) return null
    return register(name, registerOptions)
  }, [register, name, registerOptions])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.checked
    if (!isControlled) setUncontrolled(next)
    onCheckedChange?.(next)
    onChange?.(event)
    registerBinding?.onChange(event)
  }

  return (
    <label
      dir={dir}
      htmlFor={inputId}
      className={clsx(
        'inline-flex cursor-pointer items-center gap-2',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      <span className="relative inline-flex size-5 shrink-0 items-center justify-center">
        <input
          {...rest}
          {...(registerBinding
            ? { name: registerBinding.name, ref: registerBinding.ref, onBlur: registerBinding.onBlur }
            : { name })}
          id={inputId}
          type="checkbox"
          className="peer absolute inset-0 z-10 m-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          checked={isControlled ? isChecked : undefined}
          defaultChecked={!isControlled && !registerBinding ? defaultChecked : undefined}
          disabled={disabled}
          onChange={handleChange}
        />
        <span
          className={clsx(
            'pointer-events-none flex size-5 items-center justify-center rounded-[4px] border-2 border-solid border-black',
            isChecked ? 'bg-ruk-primary text-black' : 'bg-white',
          )}
          aria-hidden="true"
        >
          {isChecked ? <CheckIcon width={14} height={14} /> : null}
        </span>
      </span>

      {label ? (
        <span className="text-sm font-medium text-ruk-text">{label}</span>
      ) : null}
    </label>
  )
}
