import type { Meta, StoryObj } from '@storybook/react-vite'

import { Loading } from './loading'
import type { LoadingProps } from './loading.types'

const meta = {
  title: 'Components/Loading',
  component: Loading,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { size: 40 },
  decorators: [
    (Story) => (
      <div className="bg-white p-8 font-sans">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<LoadingProps>

export default meta
type Story = StoryObj<LoadingProps>

export const Spin: Story = { args: { type: 'spin' } }
export const Pulse: Story = { args: { type: 'pulse' } }
export const Dots: Story = { args: { type: 'dots' } }
