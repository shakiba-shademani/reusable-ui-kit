import type { SVGProps } from 'react'

export type WalletIconProps = SVGProps<SVGSVGElement>

/** Outline wallet icon — Figma Input “Icon” variant. */
export function WalletIcon({
  width = 24,
  height = 24,
  ...props
}: WalletIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <rect
        x="3"
        y="7"
        width="18"
        height="12"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3 10.5H21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 7V5.75C7 4.7835 7.7835 4 8.75 4H15.25C16.2165 4 17 4.7835 17 5.75V7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="16.5" cy="14.5" r="1" fill="currentColor" />
    </svg>
  )
}
