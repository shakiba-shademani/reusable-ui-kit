import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Wizard } from './wizard'
import type { WizardProps } from './wizard.types'

const STEPS = ['اطلاعات چک', 'صادرکننده', 'گیرندگان', 'تایید']

const meta = {
  title: 'Components/Wizard',
  component: Wizard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Step wizard tabs (from iva-pwa-pro). Visited steps use the accent underline; optional click navigation.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    steps: STEPS,
    currentStep: 1,
    isClickable: true,
    dir: 'rtl',
  } satisfies WizardProps,
  decorators: [
    (Story) => (
      <div dir="rtl" className="bg-white p-6 font-sans">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<WizardProps>

export default meta
type Story = StoryObj<WizardProps>

export const Default: Story = {
  render: (args) => {
    const [step, setStep] = useState(args.currentStep)
    return <Wizard {...args} currentStep={step} onStepClick={setStep} />
  },
}

export const NotClickable: Story = {
  args: {
    currentStep: 2,
    isClickable: false,
  },
}

export const FirstStep: Story = {
  args: {
    currentStep: 0,
    isClickable: false,
  },
}
