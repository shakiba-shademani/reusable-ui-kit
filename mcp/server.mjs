#!/usr/bin/env node
/**
 * reusable-ui-kit MCP server
 *
 * Connect this from other Cursor projects so the agent can discover
 * how to install and use this design system.
 *
 * Cursor MCP config example:
 * {
 *   "mcpServers": {
 *     "reusable-ui-kit": {
 *       "command": "node",
 *       "args": ["F:/pulse-pwa-sadad/cursor-ui-kit/mcp/server.mjs"]
 *     }
 *   }
 * }
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const packageJson = JSON.parse(
  readFileSync(join(__dirname, '..', 'package.json'), 'utf8'),
)

const COMPONENTS = {
  Input: {
    name: 'Input',
    import: `import { Input, WalletIcon } from 'reusable-ui-kit'\nimport 'reusable-ui-kit/styles.css'`,
    description:
      'RTL Persian text field compatible with react-hook-form. Normalizes Persian/Arabic digits to English. Optional amount/card/number modes. Label and text align to the right; icon on the right in RTL; error below the input.',
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Field title shown above the control (right-aligned).',
      },
      {
        name: 'error',
        type: 'string',
        description: 'Error message shown below the input in red (wins over helperText).',
      },
      {
        name: 'helperText',
        type: 'string',
        description: 'Muted helper copy below the input when there is no error.',
      },
      {
        name: 'icon',
        type: 'ReactNode',
        description: 'Optional icon on the start edge (right in RTL). Prefer WalletIcon.',
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder copy, e.g. «مانند ...».',
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: 'Disabled state with solid grey field background.',
      },
      {
        name: 'onlyNumber',
        type: 'boolean',
        description: 'Digits only. Persian/Arabic digits are accepted and stored as English.',
      },
      {
        name: 'amount',
        type: 'boolean',
        description: 'Thousand-separated numeric amount field.',
      },
      {
        name: 'cardNo',
        type: 'boolean',
        description: 'Formats up to 16 digits as card groups of 4.',
      },
      {
        name: 'persianLetter',
        type: 'boolean',
        description: 'With amount: show value in Persian words as تومان (Rials ÷ 10).',
      },
      {
        name: 'forceHover',
        type: 'boolean',
        description: 'Storybook/demo only — paints the hover border.',
      },
      {
        name: 'dir',
        type: "'rtl' | 'ltr'",
        description: 'Defaults to rtl.',
      },
      {
        name: '...rest',
        type: 'InputHTMLAttributes',
        description:
          'Native input attrs for RHF: value, onChange, onBlur, name, ref (via forwardRef).',
      },
    ],
    examples: [
      {
        title: 'Basic',
        code: `<Input label="عنوان" placeholder="مانند ..." />`,
      },
      {
        title: 'With icon',
        code: `<Input
  label="عنوان"
  placeholder="مانند ..."
  icon={<WalletIcon width={22} height={22} />}
/>`,
      },
      {
        title: 'react-hook-form register',
        code: `<Input label="موبایل" onlyNumber {...register('phone')} />`,
      },
      {
        title: 'react-hook-form Controller',
        code: `<Controller
  name="amount"
  control={control}
  render={({ field, fieldState }) => (
    <Input {...field} label="مبلغ" amount persianLetter error={fieldState.error?.message} />
  )}
/>`,
      },
      {
        title: 'Persian digits',
        code: `<Input label="کد" onlyNumber placeholder="۱۲۳۴" />`,
      },
      {
        title: 'Error',
        code: `<Input label="عنوان" error="متن راهنما" />`,
      },
      {
        title: 'Disabled',
        code: `<Input label="عنوان" placeholder="مانند ..." disabled />`,
      },
    ],
    figmaStates: [
      'Default',
      'Default + error',
      'Hover',
      'Hover + error',
      'Disabled',
    ],
    figmaVariants: ['Default', 'Placeholder', 'Icon', 'Fill'],
  },
  Button: {
    name: 'Button',
    import: `import { Button, WalletIcon } from 'reusable-ui-kit'\nimport 'reusable-ui-kit/styles.css'`,
    description:
      'RTL Persian button matching Figma Buttons/Mobile. Fill/Outline, Large/Med/Small widths, heights 40/48, optional icon, loading, block.',
    props: [
      {
        name: 'variant',
        type: "'filled' | 'outline'",
        description: 'Fill (#fcb600) or outline (black border). Default filled.',
      },
      {
        name: 'size',
        type: "'large' | 'medium' | 'small'",
        description: 'Figma widths: 330 / 200 / 161. Ignored when block.',
      },
      {
        name: 'height',
        type: '40 | 48',
        description: 'Control height in px. Default 48.',
      },
      {
        name: 'icon',
        type: 'ReactNode',
        description: 'Optional icon after the label (right side). Prefer WalletIcon.',
      },
      {
        name: 'loading',
        type: 'boolean',
        description: 'Shows spinner and disables the button.',
      },
      {
        name: 'block',
        type: 'boolean',
        description: 'Full width.',
      },
      {
        name: 'forceHover',
        type: 'boolean',
        description: 'Storybook/demo only — paints the hover style.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: 'Disabled grey state from Figma.',
      },
      {
        name: 'children',
        type: 'ReactNode',
        description: 'Label. Defaults to «متن».',
      },
    ],
    examples: [
      {
        title: 'Filled',
        code: `<Button>متن</Button>`,
      },
      {
        title: 'Outline + icon',
        code: `<Button variant="outline" icon={<WalletIcon width={24} height={24} />}>متن</Button>`,
      },
      {
        title: 'Loading',
        code: `<Button loading>در حال ثبت</Button>`,
      },
      {
        title: 'Disabled',
        code: `<Button disabled>متن</Button>`,
      },
    ],
    figmaStates: ['Default', 'Hover', 'Disabled'],
    figmaVariants: ['Fill', 'Outline', 'Large', 'Med', 'Small', 'icon'],
  },
  BottomSheet: {
    name: 'BottomSheet',
    import: `import { BottomSheet, Button } from 'reusable-ui-kit'`,
    description:
      'Reusable RTL bottom sheet (portal): backdrop, slide-up panel, title, yellow divider, optional footer. Used by Dropdown.',
    props: [
      { name: 'open', type: 'boolean', description: 'Visibility.' },
      { name: 'onClose', type: '() => void', description: 'Dismiss handler.' },
      { name: 'title', type: 'string', description: 'Centered header title.' },
      { name: 'children', type: 'ReactNode', description: 'Scrollable body.' },
      { name: 'footer', type: 'ReactNode', description: 'Optional sticky footer.' },
    ],
    examples: [
      {
        title: 'Basic',
        code: `<BottomSheet open={open} onClose={close} title="خدمت">...</BottomSheet>`,
      },
    ],
    figmaStates: [],
    figmaVariants: [],
  },
  Dropdown: {
    name: 'Dropdown',
    import: `import { Dropdown } from 'reusable-ui-kit'\nimport 'reusable-ui-kit/styles.css'`,
    description:
      'RTL dropdown field (Figma). Opens BottomSheet. Single = radio, Multiple = checkboxes. Both modes use تایید / انصراف footer (confirm disabled until a selection).',
    props: [
      { name: 'options', type: 'DropdownOption[]', description: '{ value, label, disabled? }[]' },
      { name: 'multiple', type: 'boolean', description: 'Multi-select with footer actions.' },
      { name: 'value / onChange', type: 'string | string[]', description: 'Controlled form value.' },
      { name: 'label / placeholder / sheetTitle', type: 'string', description: 'Field + sheet copy.' },
      { name: 'error', type: 'string', description: 'Red message + red border.' },
      { name: 'selectAllLabel', type: 'string', description: 'Optional select-all row (multiple).' },
      { name: 'confirmText / cancelText', type: 'string', description: 'Footer labels (multiple).' },
    ],
    examples: [
      {
        title: 'Single',
        code: `<Dropdown
  label="خدمت"
  sheetTitle="خدمت"
  options={[{ value: 'bill', label: 'قبض' }]}
  value={value}
  onChange={setValue}
/>`,
      },
      {
        title: 'Multiple',
        code: `<Dropdown
  multiple
  label="نوع سرویس"
  sheetTitle="نوع سرویس"
  selectAllLabel="همه موارد"
  options={options}
  value={values}
  onChange={setValues}
  confirmText="تایید"
  cancelText="انصراف"
/>`,
      },
      {
        title: 'react-hook-form',
        code: `<Controller
  name="service"
  control={control}
  render={({ field, fieldState }) => (
    <Dropdown {...field} options={options} error={fieldState.error?.message} />
  )}
/>`,
      },
    ],
    figmaStates: ['Default', 'Error', 'Hover', 'Hover+Error', 'Disabled'],
    figmaVariants: ['Placeholder', 'Fill'],
  },
  BottomNavigation: {
    name: 'BottomNavigation',
    import: `import { BottomNavigation } from 'reusable-ui-kit'`,
    description:
      'RTL frosted bottom tab bar. icon-only / icon-title / icon-active-title. Controlled activeIndex. Icons as ReactNode or URL.',
    props: [
      { name: 'items', type: 'BottomNavigationItem[]', description: 'Tabs with id, icon, title.' },
      { name: 'activeIndex / defaultActiveIndex', type: 'number', description: 'Active tab.' },
      { name: 'type', type: "'icon-only' | 'icon-title' | 'icon-active-title'", description: 'Label visibility.' },
      { name: 'onChange', type: '(index, item) => void', description: 'Selection callback.' },
    ],
    examples: [
      {
        title: 'Basic',
        code: `<BottomNavigation items={items} defaultActiveIndex={0} onChange={setIndex} />`,
      },
    ],
    figmaStates: ['Active indicator'],
    figmaVariants: ['icon-title', 'icon-only'],
  },
  Slider: {
    name: 'Slider',
    import: `import { Slider } from 'reusable-ui-kit'\nimport 'swiper/css'`,
    description: 'Image carousel (Swiper). Loop, autoplay, bullets, click. Peer: swiper.',
    props: [
      { name: 'items', type: 'SliderItem[]', description: '{ image, alt?, content? }' },
      { name: 'bulletPagination / loop / autoPlay', type: 'boolean', description: 'Carousel options.' },
    ],
    examples: [{ title: 'Basic', code: `<Slider items={items} bulletPagination loop />` }],
    figmaStates: [],
    figmaVariants: [],
  },
  OtpInput: {
    name: 'OtpInput',
    import: `import { OtpInput } from 'reusable-ui-kit'`,
    description:
      'OTP boxes (default 6). Persian digits normalized. Paste/autofill. Focus border #1d51b1. onChange + onComplete.',
    props: [
      { name: 'length', type: 'number', description: 'Defaults to 6.' },
      { name: 'value / onChange / onComplete', type: 'string callbacks', description: 'Form-friendly.' },
      { name: 'error', type: 'boolean', description: 'Red borders.' },
    ],
    examples: [
      {
        title: 'Basic',
        code: `<OtpInput value={code} onChange={setCode} onComplete={submit} autoFocus />`,
      },
    ],
    figmaStates: ['Default', 'Focus', 'Error'],
    figmaVariants: ['6 digits', '4 digits'],
  },
  WalletIcon: {
    name: 'WalletIcon',
    import: `import { WalletIcon } from 'reusable-ui-kit'`,
    description: 'Line wallet icon used by the Input Icon variant.',
    props: [
      {
        name: 'width / height',
        type: 'number | string',
        description: 'Defaults to 24.',
      },
      {
        name: '...svg props',
        type: 'SVGProps<SVGSVGElement>',
        description: 'Pass className, style, etc.',
      },
    ],
    examples: [
      {
        title: 'Default',
        code: `<WalletIcon width={22} height={22} />`,
      },
    ],
    figmaStates: [],
    figmaVariants: [],
  },
}

const server = new McpServer({
  name: 'reusable-ui-kit',
  version: packageJson.version ?? '0.1.0',
})

server.registerTool(
  'get_design_system_overview',
  {
    title: 'Design system overview',
    description:
      'High-level overview of reusable-ui-kit: stack, install, RTL rules, and how to consume it from another React app.',
    inputSchema: {},
  },
  async () => {
    const text = `# reusable-ui-kit v${packageJson.version}

RTL-first React design system for Persian UI.

## Stack
- React + TypeScript
- Vite (library build)
- Tailwind CSS v4
- Storybook

## Install (npm)
\`\`\`bash
npm install reusable-ui-kit
\`\`\`

\`\`\`tsx
import { Input, Button, WalletIcon } from 'reusable-ui-kit'
import 'reusable-ui-kit/styles.css'
\`\`\`

## RTL rules
- Root / field \`dir="rtl"\` by default
- Labels, placeholders, values, and errors are right-aligned
- Leading icons sit on the right (logical start in RTL)

## Local Storybook
\`\`\`bash
cd F:/pulse-pwa-sadad/cursor-ui-kit
npm run storybook
\`\`\`

## Components available now
${Object.keys(COMPONENTS)
  .map((name) => `- ${name}`)
  .join('\n')}
`
    return { content: [{ type: 'text', text }] }
  },
)

server.registerTool(
  'list_components',
  {
    title: 'List components',
    description: 'List all components exported by reusable-ui-kit.',
    inputSchema: {},
  },
  async () => {
    const text = Object.values(COMPONENTS)
      .map((c) => `- **${c.name}**: ${c.description}`)
      .join('\n')
    return { content: [{ type: 'text', text }] }
  },
)

server.registerTool(
  'get_component',
  {
    title: 'Get component docs',
    description:
      'Return props, import path, Figma variants/states, and usage examples for a component.',
    inputSchema: {
      name: z
        .string()
        .describe('Component name, e.g. "Input" or "WalletIcon"'),
    },
  },
  async ({ name }) => {
    const key = Object.keys(COMPONENTS).find(
      (k) => k.toLowerCase() === name.toLowerCase(),
    )
    if (!key) {
      return {
        content: [
          {
            type: 'text',
            text: `Unknown component "${name}". Available: ${Object.keys(COMPONENTS).join(', ')}`,
          },
        ],
        isError: true,
      }
    }

    const c = COMPONENTS[key]
    const text = `# ${c.name}

${c.description}

## Import
\`\`\`tsx
${c.import}
\`\`\`

## Props
${c.props.map((p) => `- \`${p.name}\` (${p.type}) — ${p.description}`).join('\n')}

${
  c.figmaVariants.length
    ? `## Figma variants\n${c.figmaVariants.map((v) => `- ${v}`).join('\n')}\n`
    : ''
}
${
  c.figmaStates.length
    ? `## Figma states\n${c.figmaStates.map((s) => `- ${s}`).join('\n')}\n`
    : ''
}
## Examples
${c.examples
  .map(
    (ex) => `### ${ex.title}
\`\`\`tsx
${ex.code}
\`\`\``,
  )
  .join('\n\n')}
`
    return { content: [{ type: 'text', text }] }
  },
)

server.registerTool(
  'get_install_guide',
  {
    title: 'Install guide',
    description:
      'Step-by-step guide to add reusable-ui-kit to another React / Vite / Next.js project.',
    inputSchema: {
      framework: z
        .enum(['react-vite', 'next', 'generic'])
        .default('generic')
        .describe('Target app framework'),
    },
  },
  async ({ framework }) => {
    const common = `1. \`npm install reusable-ui-kit\`
2. Import styles once near the app root: \`import 'reusable-ui-kit/styles.css'\`
3. Import components: \`import { Input } from 'reusable-ui-kit'\`
4. Wrap Persian screens with \`dir="rtl"\` (Input also defaults to rtl).`

    const extra =
      framework === 'next'
        ? `\n\nNext.js: import the CSS in \`app/layout.tsx\` (App Router) or \`pages/_app.tsx\`.`
        : framework === 'react-vite'
          ? `\n\nVite: import the CSS in \`src/main.tsx\`.`
          : ''

    return {
      content: [{ type: 'text', text: `# Install reusable-ui-kit\n\n${common}${extra}` }],
    }
  },
)

const transport = new StdioServerTransport()
await server.connect(transport)
