# reusable-ui-kit

RTL-first React design system (Persian UI) — **React**, **TypeScript**, **Vite**, **Tailwind CSS v4**, **Storybook**.

Publishable to npm, with an MCP server so other Cursor projects can learn how to use the kit.

## Quick start

```bash
cd F:/pulse-pwa-sadad/cursor-ui-kit
npm install
npm run storybook
```

## Use from another app (npm)

```bash
npm install reusable-ui-kit
```

```tsx
import { Input, WalletIcon } from 'reusable-ui-kit'
import 'reusable-ui-kit/styles.css'

export function Example() {
  return (
    <Input
      label="عنوان"
      placeholder="مانند ..."
      icon={<WalletIcon width={22} height={22} />}
      error="متن راهنما"
    />
  )
}
```

## Build & publish

```bash
npm run build
npm publish
```

## MCP server

Point Cursor MCP config at this repo so agents in other projects can query component docs:

```json
{
  "mcpServers": {
    "reusable-ui-kit": {
      "command": "node",
      "args": ["F:/pulse-pwa-sadad/cursor-ui-kit/mcp/server.mjs"]
    }
  }
}
```

Or from this package after install:

```bash
npm run mcp
```

### Tools

| Tool | Purpose |
|------|---------|
| `get_design_system_overview` | Stack, RTL rules, install |
| `list_components` | What is exported |
| `get_component` | Props + examples for one component |
| `get_install_guide` | Framework-specific install steps |

## Components

### Input

Matches the Figma matrix:

- **Variants:** Default · Placeholder · Icon · Fill · Outlined (`float` / `fixed`)  
- **States:** Default · Error · Hover · Hover+Error · Disabled  

RTL: label, value, placeholder, and error are right-aligned; icon sits on the right.

`variant="outlined"` puts the label on the field: `labelMode="float"` starts inside and rises on focus/value; `labelMode="fixed"` stays on the border.

### Behaviour

- Works with **react-hook-form** in consuming apps (no RHF dependency here):
  `{...register('mobile')}`, or `register={register}` + `name` (legacy DS style), or `Controller` + `field`.
  Refs from `register` are merged with `forwardRef`. Formatted values are written to the event before RHF runs.
- Persian and Arabic digits are normalized to English (`۰` → `0`).
- Optional modes: `onlyNumber`, `amount` (thousand separators), `cardNo`, `persianLetter`, `helperText`.
- `textAlign`: `'left' | 'center' | 'right'` (default `'right'`; use `textAlign="center"` on auth forms).

```tsx
import { useForm, Controller } from 'react-hook-form'
import { Input } from 'reusable-ui-kit'

const { register, control } = useForm()

<Input label="موبایل" onlyNumber width="100%" {...register('phone')} />

<Input
  name="mobile"
  label="شماره همراه"
  onlyNumber
  width="100%"
  register={register}
  error={errors.mobile?.message}
/>

<Controller
  name="amount"
  control={control}
  render={({ field, fieldState }) => (
    <Input {...field} label="مبلغ" amount persianLetter error={fieldState.error?.message} />
  )}
/>

<Input
  variant="outlined"
  labelMode="float"
  label="عنوان"
  placeholder="مانند ..."
/>
```

### Button

Matches the Figma Buttons/Mobile matrix:

- **Variants:** Fill · Outline  
- **Sizes:** Large (330) · Medium (200) · Small (161)  
- **Heights:** 48 · 40  
- **States:** Default · Hover · Disabled  
- **Content:** Text · Text + icon  

Also supports `loading`, `block`, `type="submit"`, and `forceHover` for Storybook.

```tsx
import { Button, WalletIcon } from 'reusable-ui-kit'

<Button>متن</Button>
<Button variant="outline" size="medium" icon={<WalletIcon />}>
  متن
</Button>
<Button loading>در حال ثبت</Button>
```

### Dropdown + BottomSheet

`Dropdown` is the Figma field. Clicking it opens a `BottomSheet` for selection.

- **Single / Multiple:** radio or checkbox rows + تایید (right) / انصراف (left) — confirm stays disabled until at least one item is selected  
- **Variants:** `default` (label above) · `outlined` (label inside or on the border)  
- **Outlined label:** `labelMode="float"` starts inside and rises to the border on click/value; `labelMode="fixed"` stays on the border  
- Optional `icon` (24×24, right edge in RTL)  
- Form-friendly (no RHF dependency in the kit):
  - **`Controller` (recommended):** spread `field` — `value` / `onChange` / `onBlur` / `ref` / `name`
  - **`register` prop (legacy Select style):** `name="service" register={register}`

```tsx
import { useForm, Controller } from 'react-hook-form'
import { Dropdown, ReceiptIcon } from 'reusable-ui-kit'

const { register, control, formState: { errors } } = useForm()

// Controller
<Controller
  name="service"
  control={control}
  rules={{ required: 'انتخاب کنید' }}
  render={({ field, fieldState }) => (
    <Dropdown
      label="خدمت"
      options={options}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      name={field.name}
      ref={field.ref}
      error={fieldState.error?.message}
    />
  )}
/>

// register prop (same idea as the previous design-system Select)
<Dropdown
  name="service"
  register={register}
  label="خدمت"
  options={options}
  error={errors.service?.message}
/>
```

```tsx
import { Dropdown, ReceiptIcon } from 'reusable-ui-kit'

// single
<Dropdown
  label="خدمت"
  sheetTitle="خدمت"
  options={[{ value: 'bill', label: 'قبض' }]}
  value={value}
  onChange={setValue}
/>

// outlined — label floats up on click
<Dropdown
  variant="outlined"
  labelMode="float"
  label="پایانه"
  placeholder="پایانه مورد نظر را انتخاب کنید"
  icon={<ReceiptIcon width={24} height={24} />}
  options={options}
/>

// outlined — label fixed on the border
<Dropdown
  variant="outlined"
  labelMode="fixed"
  label="پایانه"
  placeholder="پایانه مورد نظر را انتخاب کنید"
  icon={<ReceiptIcon width={24} height={24} />}
  options={options}
/>

// multi
<Dropdown
  multiple
  label="نوع سرویس"
  sheetTitle="نوع سرویس"
  selectAllLabel="همه موارد"
  options={options}
  value={values}
  onChange={setValues}
  confirmText="تایید"
  cancelText="انصراف"
/>
```

`BottomSheet` is also exported for custom sheets.

### Tab

RTL segmented tabs ([Figma](https://www.figma.com/design/iG91bZpxdBRaEZFosjOYek/%D9%BE%D8%A7%D9%84%D8%B3?node-id=13390-74672)). Active tab is navy `#004693`. Works with 2, 3, 4+ items.

**Controlled from outside** via `value` / `onChange` (the old DS `activeIndex` was only initial state).

```tsx
import { Tab } from 'reusable-ui-kit'

const items = [
  { value: 'debit', label: 'بدهکار' },
  { value: 'credit', label: 'بستانکاری' },
]

<Tab items={items} defaultValue="debit" onChange={setTab} />

<Tab items={items} value={tab} onChange={setTab} />
<button onClick={() => setTab('credit')}>فعال کن: بستانکاری</button>
```

### BottomNavigation

Frosted RTL tab bar (Pulse Figma). Supports `icon-only` / `icon-title` / `icon-active-title`, controlled `activeIndex`, and ReactNode icons.

### Slider

Image carousel powered by Swiper — loop, autoplay, bullets, click handlers. Peer dependency: `swiper`.

### OtpInput

6-box OTP by default (Figma). Normalizes Persian digits, paste/autofill, focus border `#1d51b1`, `onComplete`.

