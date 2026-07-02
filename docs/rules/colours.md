# COLOUR RULES — MANDATORY

Applies when: any CSS, Tailwind class, component, inline style, or design-token work.

Violations are bugs, not style preferences.

## Core rule

**Every colour used anywhere in the codebase must come from the design token system.**
No hardcoded hex, rgb, hsl, oklch, or named CSS colour values are permitted in
components, stylesheets, or Tailwind config extensions.

## What "theme colours" means

Design tokens are the single source of truth. They are defined in one place
(CSS custom properties on `:root`, or the Tailwind `theme.colors` config) and
referenced everywhere else. No colour value exists outside that definition.

## Allowed

- CSS custom properties: `var(--color-charcoal)`, `var(--color-accent)`, etc.
- Tailwind semantic classes that map to configured tokens:
  `text-charcoal`, `bg-accent`, `border-slate-light`, etc.
- `transparent` and `currentColor` where semantically correct.
- `inherit` in resets.

## Prohibited

- Hardcoded hex: `#1a1a1a`, `color: #fff`
- RGB/RGBA functions: `rgb(26, 26, 26)`, `rgba(0, 0, 0, 0.5)`
- HSL/OKLCH functions: `hsl(210, 10%, 20%)`
- Named CSS colours: `color: white`, `background: black`, `border: red`
- Inline style colour: `style="color: #333"` or `style={{ color: 'red' }}`
- Tailwind arbitrary colour values: `text-[#1a1a1a]`, `bg-[rgb(0,0,0)]`
- Opacity utilities applied to non-token colours: `bg-white/50` where `white`
  is not a configured token alias
- Extending Tailwind's default colour palette without a token name:
  `colors: { blue: { 500: '#3b82f6' } }` — give it a semantic name instead

## Adding a new colour

1. Define it in the token source (`:root` block or `tailwind.config` theme).
2. Give it a semantic name (`--color-accent`, not `--color-teal-500`).
3. Reference only via `var(--color-…)` or the Tailwind token class.
4. Never add a colour that competes with or duplicates an existing token — ask first.

## Token scope

The permitted palette maps to the design spec:

| Token role       | Description                       |
|------------------|-----------------------------------|
| `neutral-dark`   | Charcoal — primary text/surfaces  |
| `neutral-mid`    | Slate — secondary text/borders    |
| `neutral-light`  | Off-white — backgrounds           |
| `accent`         | Single controlled accent (teal/blue direction) |
| `surface`        | Page/card background              |
| `on-surface`     | Text on surface                   |

Exact values are set when the palette is finalised. The names above are
canonical — use them from day one so tokens can be swapped without touching components.

## Reviewing colour usage

When reviewing a diff, flag any colour value that does not begin with
`var(--color-` or resolve to a configured Tailwind token. There are no
exceptions for "just this once" or "it's only a small override".

Context tag: `#c3n1_colours` — confirm this tag after reading to satisfy the Context Check in CLAUDE.md.
