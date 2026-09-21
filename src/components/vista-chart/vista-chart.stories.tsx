import type { Meta, StoryObj } from '@storybook/react-vite'

import { VistaChart } from './vista-chart'
import type { VistaChartProps } from './vista-chart.types'

const meta = {
  title: 'Components/VistaChart',
  component: VistaChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'VistaChart — horizontal RTL bar visualization. Each row takes a label (title), numeric value (bar size), and an opposite description.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div dir="rtl" className="max-w-xl bg-white p-6 font-sans">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<VistaChartProps>

export default meta
type Story = StoryObj<VistaChartProps>

export const Default: Story = {
  args: {
    items: [
      { label: '06-10', value: 85_000_000 },
      { label: '10-14', value: 255_888_555_999 },
      { label: '14-18', value: 0 },
      { label: '18-22', value: 12_500_000 },
      { label: '22-02', value: 555_999 },
      { label: '02-06', value: 42_000_000 },
    ],
  },
}

export const CustomDescriptions: Story = {
  args: {
    items: [
      {
        label: 'صبح',
        value: 70,
        description: '۷۰٪ از کل',
      },
      {
        label: 'ظهر',
        value: 100,
        description: 'بیشینه بازه',
      },
      {
        label: 'شب',
        value: 35,
        description: '۳۵٪ از کل',
      },
    ],
  },
}
