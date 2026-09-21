// Small body-scroll-lock helper used by modals/overlays. Remembers whatever
// `overflow` value the body had *before* locking (not just ''), so restoring
// it doesn't clobber something else that also touches body.style.overflow.
let lockCount = 0
let previousOverflow: string | null = null

export function useScrollLock() {
  function lock() {
    if (typeof document === 'undefined') return
    if (lockCount === 0) {
      previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
    lockCount++
  }

  function unlock() {
    if (typeof document === 'undefined') return
    if (lockCount === 0) return
    lockCount--
    if (lockCount === 0) {
      document.body.style.overflow = previousOverflow ?? ''
      previousOverflow = null
    }
  }

  return { lock, unlock }
}
