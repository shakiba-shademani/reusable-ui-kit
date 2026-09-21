import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { RadioGroup } from './radio-group'
import type { RadioGroupProps } from './radio-group.types'

const OPTIONS = [
  { value: 'success', label: 'موفق' },
  { value: 'failed', label: 'ناموفق' },
  { value: 'pending', label: 'در انتظار واریز' },
]

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    title: 'وضعیت تراکنش',
    options: OPTIONS,
    dir: 'rtl',
  } satisfies RadioGroupProps,
  decorators: [
    (Story) => (
      <div dir="rtl" className="max-w-sm bg-white p-6 font-sans">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<RadioGroupProps>

export default meta
type Story = StoryObj<RadioGroupProps>

export const Default: Story = {}

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('success')
    return <RadioGroup {...args} value={value} onChange={setValue} />
  },
}
