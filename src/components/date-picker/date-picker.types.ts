import type { ChangeEvent, FocusEvent, RefCallback } from 'react'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import { DateObject } from 'react-multi-date-picker'

export const JALALI_DATE_PARAM_FORMAT = 'YYYY/MM/DD'

/**
 * Compatible with react-hook-form `UseFormRegister` without depending on RHF.
 * Use with `name`: `<DatePicker name="dueDate" register={register} />`
 */
export type DatePickerRegister = (
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

export interface DatePickerProps {
  /** Controlled selected dates. */
  value?: DateObject[]
  /** Uncontrolled initial dates (also used when `register` + form `defaultValues` string is not set). */
  defaultValue?: DateObject[] | string
  onChange?: (dates: DateObject[]) => void
  className?: string
  /** When true, select a start/end range. When false, select a single day. */
  range?: boolean
  disablePastDates?: boolean
  /** Field name for react-hook-form. Required when using `register`. */
  name?: string
  /**
   * react-hook-form `register` function:
   * `<DatePicker name="dueDate" register={register} range={false} />`
   *
   * Form value is a string:
   * - single: `YYYY/MM/DD`
   * - range: `YYYY/MM/DD,YYYY/MM/DD`
   */
  register?: DatePickerRegister
  /** Extra options forwarded to `register(name, registerOptions)`. */
  registerOptions?: object
}

const padTwo = (value: number) => String(value).padStart(2, '0')

export const toJalaliParam = (date: DateObject) =>
  `${date.year}/${padTwo(date.month.number)}/${padTwo(date.day)}`

export const fromJalaliParam = (value: string | null) => {
  if (!value) {
    return null
  }

  const date = new DateObject({
    date: value,
    format: JALALI_DATE_PARAM_FORMAT,
    calendar: persian,
    locale: persian_fa,
  })

  return date.isValid ? date : null
}

export const datesToFormValue = (dates: DateObject[]) => {
  if (dates.length === 0) return ''
  if (dates.length === 1) return toJalaliParam(dates[0])
  return `${toJalaliParam(dates[0])},${toJalaliParam(dates[1])}`
}

export const formValueToDates = (value: string | DateObject[] | undefined | null) => {
  if (!value) return []

  if (Array.isArray(value)) {
    return value.filter((date) => date?.isValid)
  }

  return value
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => fromJalaliParam(part))
    .filter((date): date is DateObject => Boolean(date?.isValid))
}
