const ONES: Record<string, string> = {
  '0': '',
  '1': 'یک',
  '2': 'دو',
  '3': 'سه',
  '4': 'چهار',
  '5': 'پنج',
  '6': 'شش',
  '7': 'هفت',
  '8': 'هشت',
  '9': 'نه',
}

const TENS: Record<string, string> = {
  '0': '',
  '1': 'ده',
  '2': 'بیست',
  '3': 'سی',
  '4': 'چهل',
  '5': 'پنجاه',
  '6': 'شصت',
  '7': 'هفتاد',
  '8': 'هشتاد',
  '9': 'نود',
}

const TEENS: Record<string, string> = {
  '10': 'ده',
  '11': 'یازده',
  '12': 'دوازده',
  '13': 'سیزده',
  '14': 'چهارده',
  '15': 'پانزده',
  '16': 'شانزده',
  '17': 'هفده',
  '18': 'هجده',
  '19': 'نوزده',
}

const HUNDREDS: Record<string, string> = {
  '0': '',
  '1': 'صد',
  '2': 'دویست',
  '3': 'سیصد',
  '4': 'چهارصد',
  '5': 'پانصد',
  '6': 'ششصد',
  '7': 'هفتصد',
  '8': 'هشتصد',
  '9': 'نهصد',
}

const SCALES = [
  '',
  'هزار',
  'میلیون',
  'میلیارد',
  'تریلیون',
  'کوادریلیون',
  'کوینتیلیون',
]

function padToTriplet(digits: string): string {
  const remainder = digits.length % 3
  if (remainder === 0) return digits
  return digits.padStart(digits.length + (3 - remainder), '0')
}

function tripletToWords(triplet: string): string {
  const [hundreds, tens, ones] = triplet.split('')
  const parts: string[] = []

  if (hundreds !== '0') {
    parts.push(HUNDREDS[hundreds] ?? '')
  }

  if (tens === '1') {
    parts.push(TEENS[tens + ones] ?? '')
    return parts.filter(Boolean).join(' و ')
  }

  if (tens !== '0') {
    parts.push(TENS[tens] ?? '')
  }

  if (ones !== '0') {
    parts.push(ONES[ones] ?? '')
  }

  return parts.filter(Boolean).join(' و ')
}

/** Convert a numeric amount to Persian words (e.g. 1250 → «هزار و دویست و پنجاه»). */
export function toPersianLetter(amount: number | string): string {
  const digits = String(amount).replace(/\D/g, '')
  if (!digits || /^0+$/.test(digits)) return ''

  const padded = padToTriplet(digits)
  const groups: string[] = []

  for (let i = 0; i < padded.length; i += 3) {
    groups.push(padded.slice(i, i + 3))
  }

  const words: string[] = []

  groups.forEach((group, index) => {
    if (group === '000') return

    const groupWords = tripletToWords(group)
    const scale = SCALES[groups.length - index - 1] ?? ''
    words.push(scale ? `${groupWords} ${scale}`.trim() : groupWords)
  })

  return words.join(' و ')
}
