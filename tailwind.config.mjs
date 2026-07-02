/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'neutral-dark':  'rgb(var(--color-neutral-dark)  / <alpha-value>)',
      'neutral-mid':   'rgb(var(--color-neutral-mid)   / <alpha-value>)',
      'neutral-light': 'rgb(var(--color-neutral-light) / <alpha-value>)',
      'accent':        'rgb(var(--color-accent)        / <alpha-value>)',
      'surface-dark':  'rgb(var(--color-surface-dark)  / <alpha-value>)',
      'surface':       'rgb(var(--color-surface)       / <alpha-value>)',
      'on-surface':    'rgb(var(--color-on-surface)    / <alpha-value>)',
      transparent: 'transparent',
      current: 'currentColor',
    },
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
