<template>
  <!-- ===== ABOUT (short) ===== -->
  <div class="container section-gap-sm">
    <h2 class="w">Оценщик, эксперт и юрист — в одной команде</h2>
  </div>

  <div class="container section-gap-sm" style="text-align:center;">
    <button type="button" class="btn btn-primary btn-lg" @click="openCallbackModal">
      <span class="a">Заказать звонок</span>
    </button>
    <a href="https://wa.me/79282101155" target="_blank" rel="noopener" class="cta-inline-alt">или напишите в WhatsApp</a>
  </div>
</template>

<script setup>
import { openCallbackModal } from '../../composables/useCallbackModal'
</script>
