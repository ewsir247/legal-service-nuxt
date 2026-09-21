<template>
  <div>
    <AppHeader />
    <NuxtPage />
    <AppFooter />
    <CallbackWidget />
  </div>
</template>

<style>
/* Print: strip navigation/CTA chrome so printed pages (articles, reviews,
   about, contacts) show only the actual content — not the sticky header,
   mobile menu, callback FAB/modal or social widget row. */
@media print {
  .header-topbar,
  .navbar-toggler,
  .header-utils,
  .ls-callback-fab,
  .ls-callback-fab-alt,
  .ls-callback-modal,
  .social-widgets-section,
  .cta-banner,
  .cta-inline-alt {
    display: none !important;
  }
}
</style>
