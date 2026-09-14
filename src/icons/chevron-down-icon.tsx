import type { SVGProps } from 'react'

export type ChevronDownIconProps = SVGProps<SVGSVGElement>

export function ChevronDownIcon({
  width = 24,
  height = 24,
  ...props
}: ChevronDownIconProps) {
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
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
