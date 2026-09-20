<template>
  <!-- ===== FINAL CTA: callback form primary, WhatsApp as secondary fallback ===== -->
  <div class="consult-section section-gap" id="consult">
    <div class="consult-section__info">
      <div class="consult-section__badge">Бесплатно</div>
      <h2 class="consult-section__title">Закажите звонок — <span>перезвоним в рабочее время</span></h2>
      <p class="consult-section__text">Оставьте заявку — свяжемся с вами и бесплатно проконсультируем</p>
      <ul class="consult-section__features">
        <li>Консультация абсолютно бесплатна</li>
        <li>Перезваниваем быстро</li>
        <li>Работаем по всему Краснодарскому краю</li>
        <li>Конфиденциальность гарантируется</li>
      </ul>
    </div>
    <div class="consult-form-wrap">
      <h4>Заказать звонок</h4>
      <p>Оставьте телефон — мы перезвоним</p>
      <button type="button" class="btn consult-form__submit" style="width:100%;display:block;text-align:center;" @click="openCallbackModal">
        Заказать звонок
      </button>
      <a href="https://wa.me/79282101155" target="_blank" rel="noopener" class="cta-inline-alt">или напишите в WhatsApp</a>
      <p class="consult-form__note">*Нажимая кнопку, вы соглашаетесь с <a href="/privacy">политикой обработки персональных данных</a></p>
    </div>
  </div>
</template>

<script setup>
import { openCallbackModal } from '../../composables/useCallbackModal'
</script>
