import type { Meta, StoryObj } from '@storybook/react-vite'

import { WalletIcon } from '../../icons/wallet-icon'
import { Input } from './input'

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'RTL Persian text field matching the Figma matrix: Default / Placeholder / Icon / Fill × Default / Error / Hover / Hover+Error / Disabled. `outlined` puts the label inside (`float` rises on focus/value) or fixed on the border.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    label: 'عنوان',
    dir: 'rtl',
  },
  decorators: [
    (Story) => (
      <div dir="rtl" className="min-h-[120px] bg-white p-6 font-sans">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Placeholder: Story = {
  args: {
    placeholder: 'مانند ...',
  },
}

export const Icon: Story = {
  args: {
    placeholder: 'مانند ...',
    icon: <WalletIcon width={22} height={22} />,
  },
}

export const Fill: Story = {
  args: {
    defaultValue: 'مانند ...',
  },
}

export const DefaultError: Story = {
  name: 'Default, error',
  args: {
    error: 'متن راهنما',
  },
}

export const PlaceholderError: Story = {
  name: 'Placeholder, error',
  args: {
    placeholder: 'مانند ...',
    error: 'متن راهنما',
  },
}

export const IconError: Story = {
  name: 'Icon, error',
  args: {
    placeholder: 'مانند ...',
    error: 'متن راهنما',
    icon: <WalletIcon width={22} height={22} />,
  },
}

export const FillError: Story = {
  name: 'Fill, error',
  args: {
    defaultValue: 'مانند ...',
    error: 'متن راهنما',
  },
}

export const Hover: Story = {
  args: {
    forceHover: true,
  },
}

export const PlaceholderHover: Story = {
  name: 'Placeholder, hover',
  args: {
    placeholder: 'مانند ...',
    forceHover: true,
  },
}

export const IconHover: Story = {
  name: 'Icon, hover',
  args: {
    placeholder: 'مانند ...',
    forceHover: true,
    icon: <WalletIcon width={22} height={22} />,
  },
}

export const FillHover: Story = {
  name: 'Fill, hover',
  args: {
    defaultValue: 'مانند ...',
    forceHover: true,
  },
}

export const HoverError: Story = {
  name: 'Hover, error',
  args: {
    error: 'متن راهنما',
    forceHover: true,
  },
}

export const PlaceholderHoverError: Story = {
  name: 'Placeholder, hover error',
  args: {
    placeholder: 'مانند ...',
    error: 'متن راهنما',
    forceHover: true,
  },
}

export const IconHoverError: Story = {
  name: 'Icon, hover error',
  args: {
    placeholder: 'مانند ...',
    error: 'متن راهنما',
    forceHover: true,
    icon: <WalletIcon width={22} height={22} />,
  },
}

export const FillHoverError: Story = {
  name: 'Fill, hover error',
  args: {
    defaultValue: 'مانند ...',
    error: 'متن راهنما',
    forceHover: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const PlaceholderDisabled: Story = {
  name: 'Placeholder, disabled',
  args: {
    placeholder: 'مانند ...',
    disabled: true,
  },
}

export const IconDisabled: Story = {
  name: 'Icon, disabled',
  args: {
    placeholder: 'مانند ...',
    disabled: true,
    icon: <WalletIcon width={22} height={22} />,
  },
}

export const FillDisabled: Story = {
  name: 'Fill, disabled',
  args: {
    defaultValue: 'مانند ...',
    disabled: true,
  },
}

export const HelperText: Story = {
  args: {
    placeholder: 'مانند ...',
    helperText: 'متن راهنما',
  },
}

export const OnlyNumber: Story = {
  args: {
    label: 'شماره تماس',
    placeholder: '۰۹۱۲۳۴۵۶۷۸۹',
    onlyNumber: true,
  },
}

export const TextAlignCenter: Story = {
  name: 'Text align · center',
  args: {
    label: 'شماره همراه',
    placeholder: '۰۹۱۲۳۴۵۶۷۸۹',
    onlyNumber: true,
    textAlign: 'center',
    width: '100%',
    required: true,
  },
}

export const Amount: Story = {
  args: {
    label: 'مبلغ',
    placeholder: 'مبلغ را وارد کنید',
    amount: true,
  },
}

export const AmountWithPersianLetter: Story = {
  args: {
    label: 'مبلغ',
    placeholder: 'مبلغ را وارد کنید',
    amount: true,
    persianLetter: true,
    defaultValue: '125000',
  },
}

export const CardNumber: Story = {
  args: {
    label: 'شماره کارت',
    placeholder: '۶۰۳۷ ۹۹۱۸ ۱۲۳۴ ۵۶۷۸',
    cardNo: true,
    defaultValue: '6037991812345678',
  },
}

export const ReactHookFormCompatible: Story = {
  name: 'react-hook-form compatible',
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Input
        name="mobile"
        label="شماره همراه (register prop)"
        placeholder="۰۹۱۲..."
        onlyNumber
        width="100%"
        helperText="در اپ: register={register} — همان الگوی design-system قبلی"
      />
      <Input
        name="mobile"
        label="شماره همراه (spread register)"
        placeholder="۰۹۱۲..."
        onlyNumber
        width="100%"
        helperText="در اپ: {...register('mobile')} onlyNumber"
      />
    </div>
  ),
}

/** Full Figma matrix: 4 variants × 5 states */
export const FigmaMatrix: Story = {
  name: 'Figma matrix',
  render: () => {
    const icon = <WalletIcon width={22} height={22} />
    const variants = [
      { key: 'default', props: {} },
      { key: 'placeholder', props: { placeholder: 'مانند ...' } },
      { key: 'icon', props: { placeholder: 'مانند ...', icon } },
      { key: 'fill', props: { defaultValue: 'مانند ...' } },
    ] as const

    const states = [
      { key: 'default', props: {} },
      { key: 'default-error', props: { error: 'متن راهنما' } },
      { key: 'hover', props: { forceHover: true } },
      { key: 'hover-error', props: { error: 'متن راهنما', forceHover: true } },
      { key: 'disabled', props: { disabled: true } },
    ] as const

    return (
      <div className="flex flex-col gap-10" dir="ltr">
        <div className="grid grid-cols-4 gap-8 text-center text-sm text-ruk-text-muted">
          <span>Default</span>
          <span>Placeholder</span>
          <span>Icon</span>
          <span>Fill</span>
        </div>
        {states.map((state) => (
          <div key={state.key} className="flex flex-col gap-3">
            <p className="m-0 text-left text-xs text-ruk-text-muted">{state.key}</p>
            <div className="grid grid-cols-4 gap-8">
              {variants.map((variant) => (
                <Input
                  key={`${state.key}-${variant.key}`}
                  label="عنوان"
                  {...variant.props}
                  {...state.props}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  },
}

const outlinedIcon = <WalletIcon width={24} height={24} />

export const OutlinedFloat: Story = {
  name: 'Outlined · float',
  args: {
    variant: 'outlined',
    labelMode: 'float',
    label: 'عنوان',
    placeholder: 'مانند ...',
  },
}

export const OutlinedFloatWithIcon: Story = {
  name: 'Outlined · float + icon',
  args: {
    variant: 'outlined',
    labelMode: 'float',
    label: 'عنوان',
    placeholder: 'مانند ...',
    icon: outlinedIcon,
  },
}

export const OutlinedFixed: Story = {
  name: 'Outlined · fixed',
  args: {
    variant: 'outlined',
    labelMode: 'fixed',
    label: 'عنوان',
    placeholder: 'مانند ...',
  },
}

export const OutlinedFixedWithIcon: Story = {
  name: 'Outlined · fixed + icon',
  args: {
    variant: 'outlined',
    labelMode: 'fixed',
    label: 'عنوان',
    placeholder: 'مانند ...',
    icon: outlinedIcon,
  },
}

export const OutlinedFilled: Story = {
  name: 'Outlined · filled',
  args: {
    variant: 'outlined',
    labelMode: 'float',
    label: 'عنوان',
    placeholder: 'مانند ...',
    defaultValue: 'متن نمونه',
    icon: outlinedIcon,
  },
}

export const OutlinedError: Story = {
  name: 'Outlined · error',
  args: {
    variant: 'outlined',
    labelMode: 'fixed',
    label: 'عنوان',
    placeholder: 'مانند ...',
    error: 'متن راهنما',
    icon: outlinedIcon,
  },
}

export const OutlinedDisabled: Story = {
  name: 'Outlined · disabled',
  args: {
    variant: 'outlined',
    labelMode: 'fixed',
    label: 'عنوان',
    placeholder: 'مانند ...',
    disabled: true,
    icon: outlinedIcon,
  },
}

export const OutlinedModes: Story = {
  name: 'Outlined modes',
  render: () => (
    <div className="flex max-w-[320px] flex-col gap-8" dir="rtl">
      <Input
        variant="outlined"
        labelMode="float"
        label="عنوان"
        placeholder="مانند ..."
        icon={outlinedIcon}
      />
      <Input
        variant="outlined"
        labelMode="fixed"
        label="عنوان"
        placeholder="مانند ..."
        icon={outlinedIcon}
      />
    </div>
  ),
}
