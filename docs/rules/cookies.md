# COOKIE & CONSENT RULES — MANDATORY

Applies when: any work that adds, modifies, or removes scripts, third-party
integrations, analytics, tracking pixels, A/B testing tools, chat widgets, or
any other code that sets cookies or reads/writes browser storage.

Violations are a legal risk (UK GDPR / PECR), not a style preference.

## The invariant

**No optional script or cookie may load before the user has accepted.**
If you add code that sets any cookie or uses browser storage for a non-essential
purpose, it must be gated on `localStorage.getItem('cookie_consent') === 'accepted'`.

Strictly necessary cookies (Netlify Forms, Netlify CDN) are exempt. Everything
else is optional and must be gated.

## What counts as optional

- Analytics (Google Analytics, Plausible, Fathom, PostHog, etc.)
- Session recording or heatmaps (Hotjar, Microsoft Clarity, etc.)
- A/B testing tools
- Live chat widgets (Intercom, Drift, Crisp, etc.)
- Social media embeds and pixels
- Advertising pixels or retargeting tags
- Any third-party script that sets its own cookies

When in doubt, treat it as optional.

## Required pattern for optional scripts

Gate on consent **at load time** using an `is:inline` script in `Base.astro`
(or the relevant layout). Check before the script tag is injected:

```astro
<!-- Base.astro — inside <head> or before </body> -->
<script is:inline>
  if (localStorage.getItem('cookie_consent') === 'accepted') {
    // inject the optional script tag here, e.g.:
    var s = document.createElement('script');
    s.src = 'https://example.com/analytics.js';
    s.async = true;
    document.head.appendChild(s);
  }
</script>
```

And fire the same load inside the consent banner's `dismiss()` function so
users who accept on first visit get the script without a page reload:

```ts
// CookieConsent.astro <script>
function dismiss(choice: string) {
  localStorage.setItem('cookie_consent', choice);
  document.documentElement.classList.add('cookie-consent-given');
  if (choice === 'accepted') {
    // fire the same script injection here
  }
}
```

## Never do this

```html
<!-- WRONG — loads regardless of consent -->
<script async src="https://www.googletagmanager.com/gtm.js?id=GTM-XXXXX"></script>

<!-- WRONG — consent check happens after the script has already run -->
<script>
  window.onload = function() {
    if (localStorage.getItem('cookie_consent') === 'accepted') { ... }
  }
</script>
```

## Privacy policy must stay current

When adding any new optional script or cookie category:

1. Add a row to the cookie table in `src/pages/privacy.astro`.
2. Update the "Last updated" date on that page.
3. Do not add a new cookie category silently — surface it in the PR or task.

## Strictly necessary cookies (no consent required)

These are already on the site and do not need gating:

| What | Why exempt |
|---|---|
| Netlify Forms cookies | Required for form submissions to function |
| Netlify CDN/edge cookies | Infrastructure-level, no personal profiling |
| `cookie_consent` (localStorage) | Required to remember the user's choice |

Do not add items to this list without confirming they genuinely cannot function
without being set (i.e. the site breaks without them).

Context tag: `#d9w2_cookies` — confirm this tag after reading to satisfy the Context Check in CLAUDE.md.
