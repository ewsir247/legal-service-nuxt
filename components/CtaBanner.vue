<template>
  <section class="cta-banner reveal">
    <h3>{{ title }}</h3>
    <p>{{ text }}</p>
    <button type="button" class="btn btn-primary btn-lg" @click="openCallbackModal">
      <span class="a">{{ buttonLabel }}</span>
    </button>
    <a href="https://wa.me/79282101155" target="_blank" rel="noopener" class="cta-banner__alt">или напишите в WhatsApp</a>
  </section>
</template>

<script setup>
import { openCallbackModal } from '../composables/useCallbackModal'

defineProps({
  title: { type: String, required: true },
  text: { type: String, required: true },
  buttonLabel: { type: String, default: 'Заказать звонок' },
})
</script>
