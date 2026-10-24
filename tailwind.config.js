// Tailwind v3 config. The design itself lives in tailwind-input.css
// (component classes on CSS variables); Tailwind supplies the reset and
// a handful of utilities. Rebuild after editing a template or the CSS:
//   npm run build:css
// See README, "Changing the design", and .claude/design-language.md.
module.exports = {
  content: [
    './layouts/**/*.html',
    './content/**/*.md',
    './static/js/**/*.js',
  ],
  // Added by static/js/site.js at runtime, so never seen in a template.
  safelist: ['js', 'in', 'is-open', 'is-active', 'on-dark', 'on-light', 'menu-open', 'reveal', 'status--building', 'status--operational', 'status--planned'],
  theme: {
    extend: {
      colors: {
        uv: { DEFAULT: '#6d28d9', bright: '#a78bfa', deep: '#42245f' },
        ink: '#0d0d0e',
        paper: '#f3f3f1',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
};
