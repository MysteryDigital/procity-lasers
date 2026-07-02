# ACCESSIBILITY RULES — MANDATORY

Applies when: any HTML, component, layout, image, or form work.

**Standard: WCAG 2.1 AA minimum.** This is a hard requirement — council clients
frequently mandate accessibility compliance when evaluating suppliers.

## Heading hierarchy

- One `<h1>` per page — the page title.
- Never skip levels (h1 → h3 is a violation).
- Heading order must reflect document structure, not visual styling. Use CSS to
  adjust appearance; never use a heading level for its size alone.

## Images

Alt text formula: `[primary subject] [descriptor] [context/location]`
Example: `sandstone facade after laser graffiti removal, Bradford town hall`

Rules:
- Maximum 125 characters.
- Never prefix with "Photo of" or "Image of".
- Decorative images: `alt=""` (empty, not absent).
- Before/after sliders: each image needs its own descriptive alt text.

## Images — loading

- **LCP / hero image:** `loading="eager" fetchpriority="high"` always. Add
  `<link rel="preload" as="image">` in `<head>`. Never lazy-load the LCP image.
- **All below-fold images:** `loading="lazy"`.
- Use Astro's `<Image>` component throughout — it enforces width/height and
  prevents layout shift (CLS).

## Colour contrast

- Normal text: 4.5:1 minimum contrast ratio against background.
- Large text (18pt+ or 14pt+ bold): 3:1 minimum.
- UI components and focus indicators: 3:1 against adjacent colours.
- Never convey information by colour alone.

## Interactive elements

- All interactive elements must be keyboard-navigable.
- Visible focus indicator on all focusable elements — do not remove the outline
  without providing an equivalent.
- Before/after slider must be operable by keyboard (arrow keys) and include
  an accessible label.

## Forms

- Every input has a visible, associated `<label>` (not just placeholder text).
- Error messages are programmatically associated with their input (`aria-describedby`).
- Required fields are marked with `aria-required="true"` and a visible indicator.

## Links

- Link text must describe the destination. "Click here" and "read more" are
  violations. "See our heritage conservation projects" is correct.
- Links that open in a new tab must include `aria-label` or visible text
  indicating this (e.g. "Pro City Painters (opens in new tab)").

## Mobile

- Tap targets minimum 44×44px.
- Phone numbers: `<a href="tel:...">` — tap-to-call on mobile.
- Email addresses: `<a href="mailto:...">`.

Context tag: `#w8m3_a11y` — confirm this tag after reading to satisfy the Context Check in CLAUDE.md.
