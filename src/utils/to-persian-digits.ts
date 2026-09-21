const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹'

/**
 * Convert ASCII digits to Persian digits. Other characters are left unchanged.
 */
export function toPersianDigits(value: string | number | null | undefined): string {
  return String(value ?? '').replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)] ?? digit)
}
