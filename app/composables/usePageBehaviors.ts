// Client-side page behaviors ported from the old Vue app's PageView.vue:
// reveal-on-scroll, animated stat counters, sticky header shadow, blur-load.
// Call `initPageBehaviors()` from a page's onMounted().

export function initReveal(root: ParentNode = document) {
  if (typeof window === 'undefined') return () => {}

  const selectors = [
    'h1', 'h2', 'h3',
    '.row', '.card', '.feature',
    '.cta-banner', '.btn',
    '.section', '.hero',
    'p', 'ul.list-clean',
  ].join(', ')

  const els = Array.from(root.querySelectorAll(selectors)) as HTMLElement[]
  if (!els.length) return () => {}

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('reveal', 'is-visible'))
    return () => {}
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          ;(e.target as HTMLElement).classList.add('is-visible')
          io.unobserve(e.target)
        }
      })
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
  )

  const groupCounters = new WeakMap<Element, number>()
  els.forEach((el) => {
    el.classList.add('reveal')
    const parent = el.parentElement
    const isGridChild = parent && (parent.classList.contains('feature-grid') || parent.classList.contains('row'))
    if (isGridChild) {
      const n = groupCounters.get(parent) || 0
      groupCounters.set(parent, n + 1)
      el.style.transitionDelay = Math.min(n * 60, 360) + 'ms'
    }
    io.observe(el)
  })

  return () => io.disconnect()
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function formatNumber(n: number, mode: string) {
  n = Math.round(n)
  if (mode === 'space') return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return n.toString()
}

function animateCounter(el: HTMLElement) {
  const target = parseInt(el.getAttribute('data-count') || '0', 10) || 0
  const suffix = el.getAttribute('data-suffix') || ''
  const format = el.getAttribute('data-format') || ''
  const duration = 1600
  const start = performance.now()
  function step(now: number) {
    const p = Math.min(1, (now - start) / duration)
    const v = target * easeOut(p)
    el.innerHTML = formatNumber(v, format) + '<em>' + suffix + '</em>'
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

function revealStatsBlock(section: HTMLElement) {
  if (section.dataset.animated) return
  section.dataset.animated = '1'
  section.classList.add('is-animated')
  section.querySelectorAll<HTMLElement>('.stat-item').forEach((item, i) => {
    setTimeout(() => {
      item.classList.add('is-visible')
      const num = item.querySelector<HTMLElement>('[data-count]')
      if (num) animateCounter(num)
    }, i * 120)
  })
}

export function initCounters(root: ParentNode = document) {
  if (typeof window === 'undefined') return () => {}
  const stats = root.querySelector<HTMLElement>('#statsBlock')
  if (!stats) return () => {}

  delete stats.dataset.animated
  stats.classList.remove('is-animated')
  stats.querySelectorAll('.stat-item').forEach((item) => item.classList.remove('is-visible'))

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            revealStatsBlock(e.target as HTMLElement)
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.25 }
    )
    io.observe(stats)
    return () => io.disconnect()
  }
  revealStatsBlock(stats)
  return () => {}
}

export function initHeaderScroll() {
  if (typeof window === 'undefined') return () => {}
  const h = document.querySelector('.header')
  if (!h) return () => {}
  function update() {
    h!.classList.toggle('is-scrolled', window.scrollY > 6)
  }
  window.addEventListener('scroll', update, { passive: true })
  update()
  return () => window.removeEventListener('scroll', update)
}

// Skeleton-load: each <img> gets a shimmering placeholder (.img-skel) until it
// has actually loaded (or failed), instead of blurring the whole page. Images
// that are already loaded (cache, SSR-hydrated and decoded) never flash a
// skeleton at all.
export function initImageSkeletons(root: ParentNode) {
  if (typeof window === 'undefined') return () => {}

  const imgs = Array.from(root.querySelectorAll('img')) as HTMLImageElement[]
  const cleanups: Array<() => void> = []

  imgs.forEach((img) => {
    if (img.complete && img.naturalWidth > 0) return // already loaded, no skeleton needed
    img.classList.add('img-skel')
    const onDone = () => img.classList.remove('img-skel')
    img.addEventListener('load', onDone, { once: true })
    img.addEventListener('error', onDone, { once: true })
    cleanups.push(() => {
      img.removeEventListener('load', onDone)
      img.removeEventListener('error', onDone)
    })
  })

  return () => cleanups.forEach((fn) => fn())
}
