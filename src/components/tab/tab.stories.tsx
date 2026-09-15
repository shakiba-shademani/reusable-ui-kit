import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Tab } from './tab'
import type { TabItem } from './tab.types'

const DEBT_ITEMS: TabItem[] = [
  { value: 'debit', label: 'بدهکار' },
  { value: 'credit', label: 'بستانکاری' },
]

const THREE_ITEMS: TabItem[] = [
  { value: 'real', label: 'حقیقی' },
  { value: 'legal', label: 'حقوقی' },
  { value: 'org', label: 'سازمانی' },
]

const FOUR_ITEMS: TabItem[] = [
  { value: 'all', label: 'همه' },
  { value: 'debit', label: 'بدهکار' },
  { value: 'credit', label: 'بستانکار' },
  { value: 'draft', label: 'پیش‌نویس' },
]

const meta = {
  title: 'Components/Tab',
  component: Tab,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'RTL segmented tabs (Figma 13390:74672). Active tab is navy (`#004693`). Controlled via `value` / `onChange` so the parent can set the active tab. Works with 2, 3, 4+ items.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    items: DEBT_ITEMS,
    dir: 'rtl',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div dir="rtl" className="min-h-24 bg-white p-6 font-sans">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tab>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CreditActive: Story = {
  name: 'Credit active',
  args: {
    defaultValue: 'credit',
  },
}

export const ThreeTabs: Story = {
  name: 'Three tabs',
  args: {
    items: THREE_ITEMS,
  },
}

export const FourTabs: Story = {
  name: 'Four tabs',
  args: {
    items: FOUR_ITEMS,
  },
}

export const Controlled: Story = {
  name: 'Controlled (from outside)',
  render: function ControlledStory() {
    const [value, setValue] = useState('credit')
    return (
      <div className="flex flex-col gap-4">
        <Tab items={DEBT_ITEMS} value={value} onChange={setValue} />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="rounded-ruk border border-solid border-ruk-border px-3 py-1 text-sm"
            onClick={() => setValue('debit')}
          >
            فعال کن: بدهکار
          </button>
          <button
            type="button"
            className="rounded-ruk border border-solid border-ruk-border px-3 py-1 text-sm"
            onClick={() => setValue('credit')}
          >
            فعال کن: بستانکاری
          </button>
        </div>
        <p className="m-0 text-right text-sm text-ruk-text-muted">
          مقدار فعلی: {value}
        </p>
      </div>
    )
  },
}

export const DisabledItem: Story = {
  name: 'Disabled item',
  args: {
    items: [
      { value: 'debit', label: 'بدهکار' },
      { value: 'credit', label: 'بستانکاری', disabled: true },
    ],
  },
}