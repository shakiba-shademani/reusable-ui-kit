import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { BottomNavigation } from './bottom-navigation'
import type { BottomNavigationItem } from './bottom-navigation.types'

function HomeIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} aria-hidden>
      <path
        d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CardIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} aria-hidden>
      <rect
        x="3"
        y="6"
        width="18"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill={filled ? 'currentColor' : 'none'}
      />
      {!filled ? (
        <path d="M3 10h18" stroke="currentColor" strokeWidth="1.5" />
      ) : (
        <path d="M3 10h18" stroke="white" strokeWidth="1.5" opacity="0.9" />
      )}
    </svg>
  )
}

function ChartIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} aria-hidden>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill={filled ? 'currentColor' : 'none'}
      />
      <path
        d="M7 15l3-3 3 2 4-5"
        stroke={filled ? 'white' : 'currentColor'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function UserIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} aria-hidden>
      <circle
        cx="12"
        cy="8"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill={filled ? 'currentColor' : 'none'}
      />
      <path
        d="M5 19c1.5-3 4-4.5 7-4.5s5.5 1.5 7 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill={filled ? 'currentColor' : 'none'}
      />
    </svg>
  )
}

const items: BottomNavigationItem[] = [
  {
    id: 'home',
    title: 'خانـه',
    icon: <HomeIcon />,
    activeIcon: <HomeIcon filled />,
  },
  {
    id: 'tx',
    title: 'تراکنش‌ها',
    icon: <CardIcon />,
    activeIcon: <CardIcon filled />,
  },
  {
    id: 'stats',
    title: 'آمار',
    icon: <ChartIcon />,
    activeIcon: <ChartIcon filled />,
  },
  {
    id: 'user',
    title: 'کاربری',
    icon: <UserIcon />,
    activeIcon: <UserIcon filled />,
  },
]

const meta = {
  title: 'Components/BottomNavigation',
  component: BottomNavigation,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: {
    items,
    defaultActiveIndex: 0,
    type: 'icon-title',
    blurred: true,
    dir: 'rtl',
  },
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-[390px] bg-white" dir="rtl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BottomNavigation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const IconOnly: Story = {
  args: { type: 'icon-only' },
}

export const IconActiveTitle: Story = {
  args: { type: 'icon-active-title' },
}

export const Controlled: Story = {
  render: function ControlledStory() {
    const [activeIndex, setActiveIndex] = useState(0)
    return (
      <BottomNavigation
        items={items}
        activeIndex={activeIndex}
        onChange={(index) => setActiveIndex(index)}
      />
    )
  },
}

export const SecondActive: Story = {
  args: { defaultActiveIndex: 1 },
}

export const SolidBackground: Story = {
  args: { blurred: false },
}
