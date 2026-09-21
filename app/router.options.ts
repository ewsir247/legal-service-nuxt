import type { RouterConfig } from '@nuxt/schema'

// Smooth-scroll to in-page anchors (used by the header nav, which links to
// landing-page sections like /#estimate) and reset scroll on normal navigation.
// The offset for the fixed header is handled by `scroll-padding-top` in
// style.css (kept in sync with .container-main's padding-top at each
// breakpoint) — no `top` here, to avoid stacking two offsets.
export default <RouterConfig>{
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
}
