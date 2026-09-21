import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Counter } from './counter'
import type { CounterProps } from './counter.types'

const meta = {
  title: 'Components/Counter',
  component: Counter,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: { defaultValue: 1, min: 0, max: 10 },
  decorators: [
    (Story) => (
      <div dir="rtl" className="bg-white p-6 font-sans">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<CounterProps>

export default meta
type Story = StoryObj<CounterProps>

export const Default: Story = {}

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState(2)
    return <Counter {...args} value={value} onChange={setValue} />
  },
}
