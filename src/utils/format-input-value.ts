import { toEnglishDigits } from './to-english-digits'

export type FormatInputOptions = {
  onlyNumber?: boolean
  amount?: boolean
  cardNo?: boolean
  cardNoSeparator?: string
  separator?: string
}

const BIDI_MARKS = /[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g

/** Strip Unicode bidi marks used to keep numeric fields visually RTL. */
export function stripBidiMarks(value: string): string {
  return value.replace(BIDI_MARKS, '')
}

/** Keep digits only (after Persian/Arabic normalization). */
export function digitsOnly(value: string): string {
  return toEnglishDigits(stripBidiMarks(value)).replace(/\D/g, '')
}

/** Thousand-separator formatting for amount fields. */
export function formatAmount(
  value: string | number | null | undefined,
  separator = ',',
): string {
  const raw = digitsOnly(String(value ?? ''))
  if (!raw) return ''
  return raw.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}

/** Group card digits as `XXXX XXXX XXXX XXXX` (max 16). */
export function formatCardNumber(
  value: string | number | null | undefined,
  separator = ' ',
): string {
  const compact = digitsOnly(String(value ?? '')).slice(0, 16)
  if (!compact) return ''
  return compact.match(/.{1,4}/g)?.join(separator) ?? compact
}

/**
 * Build the value shown in the input (and emitted via onChange).
 * Always normalizes Persian/Arabic digits to English first.
 */
export function formatInputValue(
  value: string | number | null | undefined,
  options: FormatInputOptions = {},
): string {
  const {
    onlyNumber = false,
    amount = false,
    cardNo = false,
    cardNoSeparator = ' ',
    separator = ',',
  } = options

  if (value === null || value === undefined) return ''

  const normalized = toEnglishDigits(stripBidiMarks(String(value)))

  if (onlyNumber && amount) {
    return formatAmount(normalized, separator)
  }

  if (cardNo) {
    return formatCardNumber(normalized, cardNoSeparator)
  }

  if (onlyNumber) {
    return normalized.replace(/[^\d\s-]/g, '')
  }

  return normalized
}
