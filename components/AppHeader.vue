<template>
  <header class="header">
    <!-- Top Bar -->
    <div class="header-topbar">
      <div class="header-topbar__inner">
        <div class="header-topbar__left">
          <a href="tel:88612901155" class="header-topbar__item">
            <Phone :size="13" :stroke-width="2" />
            8 (861) 290-11-55
          </a>
          <a href="mailto:legal-23@yandex.ru" class="header-topbar__item">
            <Mail :size="13" :stroke-width="2" />
            legal-23@yandex.ru
          </a>
          <span class="header-topbar__item">
            <Clock :size="13" :stroke-width="2" />
            Пн–Пт: 9:00–18:00
          </span>
          <span class="header-topbar__item">
            <MapPin :size="13" :stroke-width="2" />
            г. Краснодар, ул. Дзержинского, 8/1
          </span>
        </div>
        <div class="header-topbar__right">
          <div class="header-topbar__socials">
            <a href="https://vk.com/legal23ru" target="_blank" rel="noopener" class="header-topbar__social" title="ВКонтакте">
              <Users :size="16" :stroke-width="2" />
            </a>
            <a href="https://wa.me/79282101155" target="_blank" rel="noopener" class="header-topbar__social" title="WhatsApp">
              <MessageCircle :size="16" :stroke-width="2" />
            </a>
            <a href="https://max.ru/79282101155" target="_blank" rel="noopener" class="header-topbar__social" title="MAX">
              <MessageSquare :size="16" :stroke-width="2" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-md bg-body-tertiary">
      <div class="container-fluid">
        <NuxtLink class="navbar-brand" to="/" @click="closeAll">
          <img :src="logoUrl" class="brand-logo img-skel" alt="Легал Сервис логотип" ref="logoEl" />
          Легал Сервис
        </NuxtLink>
        <button class="navbar-toggler" type="button" @click="toggleMenu" aria-label="Навигация">
          <Menu v-if="!menuOpen" :size="22" :stroke-width="2" />
          <X v-else :size="22" :stroke-width="2" />
        </button>
        <div class="collapse navbar-collapse" :class="{ show: menuOpen }" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item" v-for="item in navItems" :key="item.to">
              <NuxtLink class="nav-link" :to="item.to" @click="closeAll">{{ item.label }}</NuxtLink>
            </li>
          </ul>
          <div class="header-utils ms-lg-3">
            <a href="tel:88612901155" class="header-phone">8 (861) 290-11-55</a>
            <button type="button" class="header-chat-btn btn btn-sm btn-primary" @click="openCallbackModal">
              <PhoneOutgoing :size="15" :stroke-width="2" />
              Заказать звонок
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Phone, PhoneOutgoing, Mail, Clock, MapPin, Menu, X, Users, MessageCircle, MessageSquare } from 'lucide-vue-next'
import { initImageSkeletons } from '../composables/usePageBehaviors'
import { openCallbackModal } from '../composables/useCallbackModal'

const menuOpen = ref(false)
const logoUrl = '/images/logo.png'
const logoEl = ref(null)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}
function closeAll() {
  menuOpen.value = false
}

onMounted(() => {
  if (logoEl.value) initImageSkeletons(logoEl.value.parentElement)
})

// Menu simplified for the single-page structure: category items point to
// landing-page anchors. "О компании" is a merged anchor combining the short
// about blurb, review highlights and article links (About/Reviews/Articles
// pages still exist and are linked from inside that section for full detail).
// Cadastral dispute no longer has its own top-level entry — it's now a
// subsection inside "Оценка" (#estimate), reachable via /#cadastral-dispute.
const navItems = [
  { label: 'Оценка', to: '/#estimate' },
  { label: 'Экспертиза', to: '/#expertise' },
  { label: 'Юридические услуги', to: '/#legal-services' },
  { label: 'Рецензирование', to: '/#reviewing' },
  { label: 'О компании', to: '/#about' },
]
</script>
