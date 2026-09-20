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
      <div class="ls-callback-modal__card">
        <button class="ls-callback-modal__close" @click="closeModal" aria-label="Закрыть"><X :size="20" :stroke-width="2" /></button>

        <template v-if="!sent">
          <span class="ls-callback-modal__badge">Бесплатно</span>
          <h3 class="ls-callback-modal__title">Заказать обратный звонок</h3>
          <p class="ls-callback-modal__lead">Оставьте заявку — перезвоним в рабочее время. Быстрее — <a class="ls-alt-link ls-alt-link--wa" :href="waLink" target="_blank" rel="noopener">напишите в WhatsApp</a>.</p>

          <div class="ls-callback-form">
            <div class="ls-callback-form__field">
              <label>Ваше имя</label>
              <input type="text" v-model="name" placeholder="Как к вам обращаться?" />
            </div>
            <div class="ls-callback-form__field">
              <label>Телефон *</label>
              <input
                type="tel"
                v-model="phone"
                :class="{ 'is-invalid': phoneError }"
                @input="maskPhone"
                @focus="onPhoneFocus"
                placeholder="+7 (___) ___-__-__"
              />
              <div class="ls-callback-form__error">{{ phoneError }}</div>
            </div>
            <div class="ls-callback-form__field">
              <label>Комментарий (необязательно)</label>
              <input type="text" v-model="comment" placeholder="Кратко о вашем вопросе" />
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

            <button class="ls-callback-form__submit" @click="submit" :disabled="submitting">
              {{ submitting ? 'Отправка…' : 'Перезвоните мне' }}
            </button>

            <div v-if="serverError" class="ls-callback-form__error" style="text-align:center;min-height:auto;margin-top:-4px;">
              {{ serverError }}
              <template v-if="showFallback">
                — напишите нам в
                <a class="ls-alt-link ls-alt-link--wa" :href="waLink" target="_blank" rel="noopener">WhatsApp</a>
                или
                <a class="ls-alt-link ls-alt-link--max" href="https://max.ru/79282101155" target="_blank" rel="noopener">MAX</a>.
              </template>
            </div>

            <p class="ls-callback-form__note">Нажимая кнопку, вы соглашаетесь с <NuxtLink to="/privacy" class="ls-alt-link" @click="closeModal">политикой обработки персональных данных</NuxtLink></p>
          </div>
        </template>

        <div v-else class="ls-callback-modal__success">
          <div class="ls-callback-modal__check"><CheckCircle :size="48" :stroke-width="2" /></div>
          <h4>Заявка принята!</h4>
          <p>Спасибо! Мы свяжемся с вами в ближайшее рабочее время.</p>
          <button class="ls-callback-form__submit" @click="closeModal">Закрыть</button>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <div class="ls-toast" :class="{ 'is-visible': toast, 'ls-toast--error': toastIsError }">{{ toastText }}</div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { Phone, X, CheckCircle, MessageCircle } from 'lucide-vue-next'
import { CALLBACK_OPEN_EVENT } from '../composables/useCallbackModal'

const ENDPOINT = '/api/callback'

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

const waLink = computed(() => {
  const msg = encodeURIComponent(
    `Здравствуйте! Прошу перезвонить.\nИмя: ${name.value || 'не указано'}\nТелефон: ${phone.value || 'не указан'}`
  )
  return `https://wa.me/79282101155?text=${msg}`
})

function openModal() {
  sent.value = false
  phoneError.value = ''
  serverError.value = ''
  showFallback.value = false
  showModal.value = true
  if (typeof document !== 'undefined') document.body.style.overflow = 'hidden'
}
function closeModal() {
  showModal.value = false
  if (typeof document !== 'undefined') document.body.style.overflow = ''
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

  const digits = phone.value.replace(/\D/g, '')
  if (digits.length < 11) {
    phoneError.value = 'Введите корректный номер телефона'
    return
  }

  submitting.value = true

  const payload = {
    name: name.value,
    phone: phone.value,
    comment: comment.value,
    website: website.value,             // honeypot
    page: typeof window !== 'undefined' ? window.location.href : '',
  }

  // Local backup regardless of network result
  try {
    const arr = JSON.parse(localStorage.getItem('ls_callback_requests_v1') || '[]')
    arr.push({ ...payload, date: new Date().toISOString() })
    localStorage.setItem('ls_callback_requests_v1', JSON.stringify(arr))
  } catch (e) { /* ignore */ }

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

watch(showModal, (v) => { if (!v && typeof document !== 'undefined') document.body.style.overflow = '' })
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
