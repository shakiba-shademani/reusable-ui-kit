const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹'
const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩'

/**
 * Normalize Persian / Arabic-Indic digits to ASCII `0-9`.
 * Other characters are left unchanged.
 */
export function toEnglishDigits(value: string | number | null | undefined): string {
  return String(value ?? '').replace(/[۰-۹٠-٩]/g, (char) => {
    const persianIndex = PERSIAN_DIGITS.indexOf(char)
    if (persianIndex !== -1) return String(persianIndex)

    const arabicIndex = ARABIC_DIGITS.indexOf(char)
    return arabicIndex !== -1 ? String(arabicIndex) : char
  })
}
