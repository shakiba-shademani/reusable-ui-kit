import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Checkbox } from './checkbox'
import type { CheckboxProps } from './checkbox.types'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    label: 'پذیرنده و پایانه',
    dir: 'rtl',
  } satisfies CheckboxProps,
  decorators: [
    (Story) => (
      <div dir="rtl" className="bg-white p-6 font-sans">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<CheckboxProps>

export default meta
type Story = StoryObj<CheckboxProps>

export const Default: Story = {}

export const Checked: Story = {
  args: { defaultChecked: true },
}

export const Disabled: Story = {
  args: { disabled: true, defaultChecked: true },
}

export const Interactive: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false)
    return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />
  },
}
