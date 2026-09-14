import { toEnglishDigits } from './to-english-digits'

export type FormatInputOptions = {
  onlyNumber?: boolean
  amount?: boolean
  cardNo?: boolean
  cardNoSeparator?: string
  separator?: string
}

/** Keep digits only (after Persian/Arabic normalization). */
export function digitsOnly(value: string): string {
  return toEnglishDigits(value).replace(/\D/g, '')
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
  const normalized = toEnglishDigits(String(value ?? ''))
  const cleaned = normalized.replace(/[^\d*\s-]/g, '')
  const compact = cleaned.replace(/[\s-]/g, '').slice(0, 16)

  if (/^\d+$/.test(compact)) {
    return compact.match(/.{1,4}/g)?.join(separator) ?? ''
  }

  return cleaned
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

  const normalized = toEnglishDigits(value)

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
