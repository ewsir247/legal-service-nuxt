<template>
  <main class="container-main">
    <div class="container" ref="rootEl">
      <section class="hero">
        <span class="hero-badge">Легал Сервис</span>
        <h1 class="q"><span class="qw">Политика</span> обработки персональных данных</h1>
        <p class="e">ООО «Легал Сервис» — как мы собираем, храним и используем ваши персональные данные.</p>
      </section>

      <section class="section reveal">
        <h2 class="section-title">1. Общие положения</h2>
        <p class="section-text section-text--left">Настоящая политика определяет порядок обработки персональных данных пользователей сайта ООО «Легал Сервис» (ИНН 2308190291, ОГРН 1122308006688, г. Краснодар, ул. Дзержинского, 8/1) в соответствии с Федеральным законом от 27.07.2006 №152-ФЗ «О персональных данных».</p>
      </section>

      <section class="section reveal">
        <h2 class="section-title">2. Какие данные собираются</h2>
        <ul class="list-clean">
          <li>Имя</li>
          <li>Номер телефона</li>
          <li>Комментарий к заявке (при заполнении формы обратного звонка)</li>
        </ul>
      </section>

      <section class="section reveal">
        <h2 class="section-title">3. Цель обработки данных</h2>
        <p class="section-text section-text--left">Данные собираются исключительно для обратной связи с пользователем: обработки заявки на консультацию, обратный звонок и предоставление информации об услугах компании.</p>
      </section>

      <section class="section reveal">
        <h2 class="section-title">4. Передача третьим лицам</h2>
        <p class="section-text section-text--left">Персональные данные не передаются третьим лицам, за исключением случаев, прямо предусмотренных законодательством Российской Федерации.</p>
      </section>

      <section class="section reveal">
        <h2 class="section-title">5. Срок хранения</h2>
        <p class="section-text section-text--left">Данные хранятся в течение срока, необходимого для обработки заявки и последующего взаимодействия с клиентом, но не более 3 лет с момента последнего обращения, если иное не установлено законом.</p>
      </section>

      <section class="section reveal">
        <h2 class="section-title">6. Отзыв согласия</h2>
        <p class="section-text section-text--left">Вы вправе в любой момент отозвать согласие на обработку персональных данных, направив письменное обращение на электронную почту <a href="mailto:legal-23@yandex.ru">legal-23@yandex.ru</a>. После получения обращения данные будут удалены, если их дальнейшее хранение не требуется по закону.</p>
      </section>

      <section class="section reveal">
        <h2 class="section-title">7. Меры защиты</h2>
        <p class="section-text section-text--left">Компания принимает необходимые организационные и технические меры для защиты персональных данных от неправомерного доступа, уничтожения, изменения и распространения.</p>
      </section>

      <section class="section reveal">
        <h2 class="section-title">8. Контакты</h2>
        <p class="section-text section-text--left">По вопросам обработки персональных данных обращайтесь по адресу: <a href="mailto:legal-23@yandex.ru">legal-23@yandex.ru</a> или по телефону <a href="tel:88612901155">8 (861) 290-11-55</a>.</p>
      </section>

    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { initReveal, initHeaderScroll, initImageSkeletons } from '../composables/usePageBehaviors'
import { useLegalSeo, deriveDescription } from '../composables/useLegalSeo'

const rootEl = ref(null)

useLegalSeo({
  title: 'Политика обработки персональных данных — Легал Сервис, Краснодар',
  description: deriveDescription('Политика обработки персональных данных ООО «Легал Сервис»: какие данные собираются через форму обратного звонка, с какой целью и как их защищаем.'),
  path: '/privacy',
})

let cleanupFns = []
onMounted(() => {
  cleanupFns.push(initReveal(rootEl.value))
  cleanupFns.push(initHeaderScroll())
  cleanupFns.push(initImageSkeletons(rootEl.value))
})
onBeforeUnmount(() => { cleanupFns.forEach((fn) => fn && fn()); cleanupFns = [] })
</script>
