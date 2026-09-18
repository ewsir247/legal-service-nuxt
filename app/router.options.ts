import type { RouterConfig } from '@nuxt/schema'

// Smooth-scroll to in-page anchors (used by the header nav, which links to
// landing-page sections like /#estimate) and reset scroll on normal navigation.
export default <RouterConfig>{
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 90 }
    }
    return { top: 0 }
  },
}
