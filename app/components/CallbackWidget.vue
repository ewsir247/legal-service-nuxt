<template>
  <div>
    <!-- Floating button (FAB): primary action opens the callback (phone) modal -->
    <button
      class="ls-callback-fab"
      @click="openModal"
      aria-label="Заказать обратный звонок"
    >
      <span class="ls-callback-fab__pulse"></span>
      <Phone :size="22" :stroke-width="2" />
      <span class="ls-callback-fab__label">Заказать звонок</span>
    </button>
    <a
      href="https://wa.me/79282101155"
      target="_blank"
      rel="noopener"
      class="ls-callback-fab-alt"
      aria-label="Написать юристу в WhatsApp"
    >
      <MessageCircle :size="18" :stroke-width="2" />
    </a>

    <!-- Modal -->
    <div class="ls-callback-modal" :class="{ 'is-open': showModal }">
      <div class="ls-callback-modal__backdrop" @click="closeModal"></div>
      <div
        ref="modalCardEl"
        class="ls-callback-modal__card"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        @keydown="onModalKeydown"
      >
        <button type="button" class="ls-callback-modal__close" @click="closeModal" aria-label="Закрыть"><X :size="20" :stroke-width="2" /></button>

        <template v-if="!sent">
          <span class="ls-callback-modal__badge">Бесплатно</span>
          <h3 :id="titleId" class="ls-callback-modal__title">Заказать обратный звонок</h3>
          <p class="ls-callback-modal__lead">Оставьте заявку — перезвоним в рабочее время. Быстрее — <a class="ls-alt-link ls-alt-link--wa" :href="waLink" target="_blank" rel="noopener">напишите в WhatsApp</a>.</p>

          <form class="ls-callback-form" @submit.prevent="submit">
            <div class="ls-callback-form__field">
              <label :for="nameId">Ваше имя</label>
              <input :id="nameId" ref="nameInputEl" type="text" v-model="name" autocomplete="name" placeholder="Как к вам обращаться?" />
            </div>
            <div class="ls-callback-form__field">
              <label :for="phoneId">Телефон *</label>
              <input
                :id="phoneId"
                type="tel"
                inputmode="tel"
                required
                v-model="phone"
                :class="{ 'is-invalid': phoneError }"
                :aria-invalid="!!phoneError"
                :aria-describedby="phoneError ? phoneErrorId : undefined"
                autocomplete="tel"
                @input="maskPhone"
                @focus="onPhoneFocus"
                placeholder="+7 (___) ___-__-__"
              />
              <div :id="phoneErrorId" class="ls-callback-form__error" role="alert">{{ phoneError }}</div>
            </div>
            <div class="ls-callback-form__field">
              <label :for="commentId">Комментарий (необязательно)</label>
              <input :id="commentId" type="text" v-model="comment" placeholder="Кратко о вашем вопросе" />
            </div>

            <!-- Honeypot: hidden from real users, catches bots -->
            <input
              type="text"
              v-model="website"
              class="ls-hp"
              tabindex="-1"
              autocomplete="off"
              aria-hidden="true"
            />

            <!-- Cloudflare Turnstile: only rendered once a site key is configured -->
            <div v-if="turnstileSiteKey" ref="turnstileEl" class="cf-turnstile" :data-sitekey="turnstileSiteKey"></div>

            <button type="submit" class="ls-callback-form__submit" :disabled="submitting">
              {{ submitting ? 'Отправка…' : 'Перезвоните мне' }}
            </button>

            <div v-if="serverError" class="ls-callback-form__error ls-callback-form__error--server" role="alert">
              {{ serverError }}
              <template v-if="showFallback">
                — напишите нам в
                <a class="ls-alt-link ls-alt-link--wa" :href="waLink" target="_blank" rel="noopener">WhatsApp</a>
                или
                <a class="ls-alt-link ls-alt-link--max" href="https://max.ru/79282101155" target="_blank" rel="noopener">MAX</a>.
              </template>
            </div>

            <p class="ls-callback-form__note">Нажимая кнопку, вы соглашаетесь с <NuxtLink to="/privacy" class="ls-alt-link" @click="closeModal">политикой обработки персональных данных</NuxtLink></p>
          </form>
        </template>

        <div v-else class="ls-callback-modal__success">
          <div class="ls-callback-modal__check"><CheckCircle :size="48" :stroke-width="2" /></div>
          <h4>Заявка принята!</h4>
          <p>Спасибо! Мы свяжемся с вами в ближайшее рабочее время.</p>
          <button type="button" class="ls-callback-form__submit" @click="closeModal">Закрыть</button>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <div class="ls-toast" :class="{ 'is-visible': toast, 'ls-toast--error': toastIsError }">{{ toastText }}</div>
  </div>
</template>

<script setup>
import { ref, computed, useId, onMounted, onUnmounted, nextTick } from 'vue'
import { Phone, X, CheckCircle, MessageCircle } from 'lucide-vue-next'
import { CALLBACK_OPEN_EVENT } from '../composables/useCallbackModal'
import { isValidPhone } from '../../shared/utils/callback'
import { useScrollLock } from '../composables/useScrollLock'

const ENDPOINT = '/api/callback'

// Unique per component instance (useId(), Vue 3.5+) so labels/ids never
// collide if this widget is ever mounted more than once on a page.
const nameId = `callback-name-${useId()}`
const phoneId = `callback-phone-${useId()}`
const phoneErrorId = `callback-phone-error-${useId()}`
const commentId = `callback-comment-${useId()}`
const titleId = `callback-modal-title-${useId()}`

const scrollLock = useScrollLock()
const modalCardEl = ref(null)
const nameInputEl = ref(null)
let lastFocusedEl = null

const turnstileSiteKey = useRuntimeConfig().public.turnstileSiteKey
const turnstileEl = ref(null)

// Load the Turnstile script only when a site key is configured — without a
// key the widget is never rendered and the form works exactly as before
// (honeypot-only bot protection), no broken/blocked form state.
if (turnstileSiteKey) {
  useHead({
    script: [{ src: 'https://challenges.cloudflare.com/turnstile/v0/api.js', async: true, defer: true }],
  })
}

const showModal = ref(false)
const name = ref('')
const phone = ref('')
const comment = ref('')
const website = ref('')          // honeypot
const phoneError = ref('')
const serverError = ref('')
const showFallback = ref(false)
const submitting = ref(false)
const sent = ref(false)
const toast = ref(false)
const toastText = ref('')
const toastIsError = ref(false)
// Generated once per form-open, not per submit, so a retried submit after a
// network error is recognized server-side as the same request.
let idempotencyKey = ''

const waLink = computed(() => {
  const msg = encodeURIComponent(
    `Здравствуйте! Прошу перезвонить.\nИмя: ${name.value || 'не указано'}\nТелефон: ${phone.value || 'не указан'}`
  )
  return `https://wa.me/79282101155?text=${msg}`
})

function openModal() {
  lastFocusedEl = (typeof document !== 'undefined') ? document.activeElement : null
  sent.value = false
  phoneError.value = ''
  serverError.value = ''
  showFallback.value = false
  showModal.value = true
  idempotencyKey = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`
  scrollLock.lock()
  nextTick(() => {
    // Focus the first field once it's rendered; fall back to the close
    // button if for some reason the input isn't there yet.
    const target = nameInputEl.value || modalCardEl.value?.querySelector('.ls-callback-modal__close')
    target?.focus()
  })
}
function closeModal() {
  showModal.value = false
  scrollLock.unlock()
  if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') lastFocusedEl.focus()
  lastFocusedEl = null
}

// Simple focus trap: keep Tab/Shift+Tab cycling within the modal card
// while it's open, without pulling in a library.
function onModalKeydown(e) {
  if (e.key !== 'Tab') return
  const focusable = modalCardEl.value?.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )
  if (!focusable || focusable.length === 0) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

function onPhoneFocus() {
  if (!phone.value) phone.value = '+7 '
}

function maskPhone(e) {
  let v = (e ? e.target.value : phone.value).replace(/\D/g, '')
  if (v.length === 0) { phone.value = ''; return }
  if (v[0] === '7' || v[0] === '8') v = v.slice(1)
  v = v.substring(0, 10)
  let f = '+7'
  if (v.length > 0) f += ' (' + v.substring(0, 3)
  if (v.length >= 4) f += ') ' + v.substring(3, 6)
  if (v.length >= 7) f += '-' + v.substring(6, 8)
  if (v.length >= 9) f += '-' + v.substring(8, 10)
  phone.value = f
}

function showToast(text, isError = false) {
  toastText.value = text
  toastIsError.value = isError
  toast.value = true
  setTimeout(() => { toast.value = false }, 4500)
}

async function submit() {
  phoneError.value = ''
  serverError.value = ''
  showFallback.value = false

  if (!isValidPhone(phone.value)) {
    phoneError.value = 'Введите корректный номер телефона'
    return
  }

  submitting.value = true

  // Turnstile token, if the widget is present (window.turnstile is loaded by
  // the api.js script tag added above).
  let turnstileToken = ''
  if (turnstileSiteKey && typeof window !== 'undefined' && window.turnstile && turnstileEl.value) {
    try { turnstileToken = window.turnstile.getResponse(turnstileEl.value) || '' } catch { /* ignore */ }
  }

  const payload = {
    name: name.value,
    phone: phone.value,
    comment: comment.value,
    website: website.value,             // honeypot
    page: typeof window !== 'undefined' ? window.location.href : '',
    turnstileToken,
    idempotencyKey,
  }

  try {
    const resp = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    let result = {}
    try { result = await resp.json() } catch (e) { /* non-JSON */ }

    if (resp.ok && result.ok) {
      sent.value = true
      showToast('Заявка отправлена! Мы вам перезвоним.')
    } else {
      serverError.value = result.error || 'Не удалось отправить заявку.'
      showFallback.value = true
      showToast('Ошибка отправки. Попробуйте ещё раз.', true)
    }
  } catch (e) {
    serverError.value = 'Нет связи с сервером.'
    showFallback.value = true
    showToast('Нет связи с сервером.', true)
  } finally {
    submitting.value = false
  }
}

// Close on Escape
function onKey(e) { if (e.key === 'Escape') closeModal() }
onMounted(() => {
  document.addEventListener('keydown', onKey)
  window.addEventListener(CALLBACK_OPEN_EVENT, openModal)
})
onUnmounted(() => {
  document.removeEventListener('keydown', onKey)
  window.removeEventListener(CALLBACK_OPEN_EVENT, openModal)
})

</script>

<style scoped>
/* Honeypot — visually hidden but present in the DOM for bots to fill */
.ls-hp {
  position: absolute !important;
  left: -9999px !important;
  width: 1px !important;
  height: 1px !important;
  opacity: 0 !important;
  pointer-events: none !important;
}
</style>
