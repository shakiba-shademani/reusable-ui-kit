import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Switch } from './switch'
import type { SwitchProps } from './switch.types'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: { label: 'اعلان‌ها', dir: 'rtl' },
  decorators: [
    (Story) => (
      <div dir="rtl" className="bg-white p-6 font-sans">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<SwitchProps>

export default meta
type Story = StoryObj<SwitchProps>

export const Default: Story = {}

export const On: Story = { args: { defaultChecked: true } }

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false)
    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />
  },
}
