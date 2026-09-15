import type { SVGProps } from 'react'

export type ReceiptIconProps = SVGProps<SVGSVGElement>

/** Outline POS / receipt icon — Figma Dropdown outlined “Icon” slot (24×24). */
export function ReceiptIcon({
  width = 24,
  height = 24,
  ...props
}: ReceiptIconProps) {
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
      <path
        d="M7.5 2.5H16.5V10H7.5V2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10 5H14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10 7.25H14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="4.5"
        y="9.5"
        width="15"
        height="12"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}
