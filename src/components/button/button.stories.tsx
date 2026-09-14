import type { Meta, StoryObj } from '@storybook/react-vite'

import { WalletIcon } from '../../icons/wallet-icon'
import { Button } from './button'
import type { ButtonHeight, ButtonSize, ButtonVariant } from './button.types'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'RTL Persian button matching the Figma Buttons/Mobile matrix: Fill / Outline × Large / Med / Small × Default / Hover / Disabled × text / icon. Heights 40 and 48.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    children: 'متن',
    variant: 'filled',
    size: 'large',
    height: 48,
    dir: 'rtl',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outline'],
    },
    size: {
      control: 'select',
      options: ['large', 'medium', 'small'],
    },
    height: {
      control: 'select',
      options: [40, 48],
    },
  },
  decorators: [
    (Story) => (
      <div dir="rtl" className="min-h-[80px] bg-white p-6 font-sans">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

const wallet = <WalletIcon width={24} height={24} />

export const Filled: Story = {}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
}

export const FilledWithIcon: Story = {
  args: {
    icon: wallet,
  },
}

export const OutlineWithIcon: Story = {
  args: {
    variant: 'outline',
    icon: wallet,
  },
}

export const Medium: Story = {
  args: {
    size: 'medium',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
  },
}

export const Height40: Story = {
  name: 'Height 40',
  args: {
    height: 40,
  },
}

export const Hover: Story = {
  args: {
    forceHover: true,
  },
}

export const OutlineHover: Story = {
  name: 'Outline, hover',
  args: {
    variant: 'outline',
    forceHover: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const OutlineDisabled: Story = {
  name: 'Outline, disabled',
  args: {
    variant: 'outline',
    disabled: true,
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    children: 'در حال ثبت',
  },
}

export const LoadingOutline: Story = {
  name: 'Outline, loading',
  args: {
    variant: 'outline',
    loading: true,
    children: 'در حال بارگذاری',
  },
}

export const Block: Story = {
  args: {
    block: true,
    children: 'دکمه تمام عرض',
  },
}

export const Submit: Story = {
  args: {
    type: 'submit',
    children: 'ثبت اطلاعات',
  },
}

/** Full Figma matrix: height × size × variant × state × icon */
export const FigmaMatrix: Story = {
  name: 'Figma matrix',
  render: () => {
    const heights: ButtonHeight[] = [48, 40]
    const sizes: ButtonSize[] = ['large', 'medium', 'small']
    const variants: ButtonVariant[] = ['filled', 'outline']
    const states = [
      { key: 'default', props: {} },
      { key: 'hover', props: { forceHover: true } },
      { key: 'disabled', props: { disabled: true } },
    ] as const

    return (
      <div className="flex flex-col gap-12" dir="ltr">
        {heights.map((height) => (
          <section key={height} className="flex flex-col gap-6">
            <h3 className="m-0 text-sm font-semibold text-ruk-text">
              Height {height}
            </h3>
            {states.map((state) => (
              <div key={`${height}-${state.key}`} className="flex flex-col gap-3">
                <p className="m-0 text-xs text-ruk-text-muted">{state.key}</p>
                <div className="flex flex-col gap-4">
                  {variants.map((variant) => (
                    <div
                      key={`${height}-${state.key}-${variant}`}
                      className="flex flex-wrap items-center gap-4"
                    >
                      {sizes.map((size) => (
                        <Button
                          key={`${height}-${state.key}-${variant}-${size}-text`}
                          height={height}
                          size={size}
                          variant={variant}
                          {...state.props}
                        >
                          متن
                        </Button>
                      ))}
                      {sizes.map((size) => (
                        <Button
                          key={`${height}-${state.key}-${variant}-${size}-icon`}
                          height={height}
                          size={size}
                          variant={variant}
                          icon={wallet}
                          {...state.props}
                        >
                          متن
                        </Button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>
    )
  },
}
