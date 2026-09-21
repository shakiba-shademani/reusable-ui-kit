import type {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  ReactNode,
  RefCallback,
} from 'react'

export type FormRegister = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any,
) => {
  onChange: (event: ChangeEvent<HTMLInputElement>) => unknown
  onBlur: (event: FocusEvent<HTMLInputElement>) => unknown
  ref: RefCallback<HTMLInputElement>
  name: string
}

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> & {
  label?: ReactNode
  /** Controlled checked state. */
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  register?: FormRegister
  registerOptions?: object
  dir?: 'rtl' | 'ltr'
}
