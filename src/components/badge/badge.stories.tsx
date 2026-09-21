import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Badge } from './badge'
import type { BadgeProps } from './badge.types'

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M2.5 4.5H13.5M4.5 8H11.5M6.5 11.5H9.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Filter chip badge (Figma Pulse). Default is outlined gray; selected state is red with a clear (X) control.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    label: 'بازه زمانی',
    dir: 'rtl',
  } satisfies BadgeProps,
  decorators: [
    (Story) => (
      <div dir="rtl" className="flex min-h-24 flex-wrap gap-2 bg-white p-6 font-sans">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<BadgeProps>

export default meta
type Story = StoryObj<BadgeProps>

function InteractiveBadge(props: BadgeProps) {
  const [selected, setSelected] = useState(Boolean(props.defaultSelected ?? props.selected))

  return (
    <Badge
      {...props}
      selected={selected}
      onSelectedChange={setSelected}
    />
  )
}

export const Default: Story = {
  render: (args) => <InteractiveBadge {...args} />,
}

export const Selected: Story = {
  args: {
    label: 'پذیرنده و پایانه',
    defaultSelected: true,
  },
  render: (args) => <InteractiveBadge {...args} />,
}

export const WithIcon: Story = {
  args: {
    label: '۱ فیلتر',
    icon: <FilterIcon />,
    defaultSelected: true,
  },
  render: (args) => <InteractiveBadge {...args} />,
}

export const Group: Story = {
  render: () => {
    const [merchant, setMerchant] = useState(true)
    const [dateRange, setDateRange] = useState(false)
    const [filter, setFilter] = useState(true)

    return (
      <>
        <Badge
          icon={<FilterIcon />}
          selected={filter}
          onSelectedChange={setFilter}
        >
          ۱ فیلتر
        </Badge>
        <Badge
          label="پذیرنده و پایانه"
          selected={merchant}
          onSelectedChange={setMerchant}
        />
        <Badge
          label="بازه زمانی"
          selected={dateRange}
          onSelectedChange={setDateRange}
        />
      </>
    )
  },
}
