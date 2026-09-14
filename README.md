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

- **Variants:** Default · Placeholder · Icon · Fill  
- **States:** Default · Error · Hover · Hover+Error · Disabled  

RTL: label, value, placeholder, and error are right-aligned; icon sits on the right.

### Behaviour

- Works with **react-hook-form** via native `ref` / `name` / `value` / `onChange` / `onBlur`
  (`{...register('field')}` or `<Controller render={({ field }) => <Input {...field} />} />`).
- Persian and Arabic digits are normalized to English (`۰` → `0`).
- Optional modes: `onlyNumber`, `amount` (thousand separators), `cardNo`, `persianLetter`, `helperText`.

```tsx
import { useForm, Controller } from 'react-hook-form'
import { Input } from 'reusable-ui-kit'

const { register, control } = useForm()

<Input label="موبایل" onlyNumber {...register('phone')} />

<Controller
  name="amount"
  control={control}
  render={({ field, fieldState }) => (
    <Input {...field} label="مبلغ" amount persianLetter error={fieldState.error?.message} />
  )}
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
- Form-friendly: `value` / `onChange` / `error` (works with `Controller`)

```tsx
import { Dropdown } from 'reusable-ui-kit'

// single
<Dropdown
  label="خدمت"
  sheetTitle="خدمت"
  options={[{ value: 'bill', label: 'قبض' }]}
  value={value}
  onChange={setValue}
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

