<template>
  <main class="container-main">
    <div class="container" ref="rootEl">
      <Breadcrumbs :items="[{ name: 'Главная', path: '/' }, { name: 'Полезные статьи', path: '/articles' }]" />
      <section class="hero">
        <span class="hero-badge">Легал Сервис</span>
        <h1 class="q"><span class="qw">Полезные</span> статьи</h1>
        <p class="e">Разъясняем сложные юридические темы простым языком.</p>
      </section>

      <section class="section">
        <div class="feature-grid">
          <article class="feature reveal">
            <h3 class="feature__title"><a href="#art-cadastral" class="g">Как оспорить кадастровую стоимость в 2025 году</a></h3>
            <p class="feature__text">Разбор процедуры оспаривания в комиссии и суде. <a href="#art-cadastral">Читать →</a></p>
          </article>
          <article class="feature reveal">
            <h3 class="feature__title"><a href="#art-expertise" class="g">Что нужно знать о судебной экспертизе</a></h3>
            <p class="feature__text">Чем судебная экспертиза отличается от досудебной. <a href="#art-expertise">Читать →</a></p>
          </article>
          <article class="feature reveal">
            <h3 class="feature__title"><a href="#art-replanning" class="g">Перепланировка квартиры: как узаконить</a></h3>
            <p class="feature__text">Инструкция по согласованию и узакониванию перепланировки. <a href="#art-replanning">Читать →</a></p>
          </article>
          <article class="feature reveal">
            <h3 class="feature__title"><a href="#art-bankruptcy" class="g">Банкротство физического лица: за и против</a></h3>
            <p class="feature__text">Когда подавать на банкротство и какие последствия. <a href="#art-bankruptcy">Читать →</a></p>
          </article>
          <article class="feature reveal">
            <h3 class="feature__title">Раздел имущества при разводе</h3>
            <p class="feature__text">Какое имущество совместное и как разделить квартиру в ипотеке.</p>
          </article>
          <article class="feature reveal">
            <h3 class="feature__title">Оценка для нотариуса при наследстве</h3>
            <p class="feature__text">Какие отчёты принимают нотариусы и как сэкономить на госпошлине.</p>
          </article>
        </div>
      </section>

      <section class="section reveal" id="art-cadastral">
        <h2 class="section-title">Как оспорить кадастровую стоимость в 2025 году</h2>
        <p class="section-text section-text--left">Если кадастровая стоимость выше рыночной — оспорьте через комиссию или иск в суд с отчётом независимого оценщика по ФЗ №135-ФЗ. Статус проверяйте по выписке из ЕГРН.</p>
      </section>

      <section class="section reveal" id="art-expertise">
        <h2 class="section-title">Что нужно знать о судебной экспертизе</h2>
        <p class="section-text section-text--left">Судебную экспертизу назначает суд определением по делу; независимую — заказывает сторона сама, до суда, чтобы заранее оценить шансы на иск. Суд может принять её как доказательство, а может отклонить.</p>
      </section>

      <section class="section reveal" id="art-replanning">
        <h2 class="section-title">Перепланировка квартиры: как узаконить</h2>
        <p class="section-text section-text--left">Перенос перегородок, новые проёмы, объединение санузла — часть изменений согласуют заранее, часть узаконивают по факту через МФЦ или суд, приложив техническое заключение эксперта: несущие конструкции не затронуты. Без него не примут.</p>
      </section>

      <section class="section reveal" id="art-bankruptcy">
        <h2 class="section-title">Банкротство физического лица: за и против</h2>
        <p class="section-text section-text--left">Регулируется главой X закона №127-ФЗ — через арбитражный суд или МФЦ. Плюс: списание непогасимых долгов, проценты и штрафы больше не начисляются. Минус: незащищённое имущество продают, на несколько лет действуют ограничения (например, на руководящие должности). При сокрытии имущества от долгов не освободят.</p>
      </section>

      <CtaBanner
        title="Нужна консультация по теме «Статьи»?"
        text="Опишите ситуацию в чате — подскажем, как мы можем помочь."
      />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { initReveal, initHeaderScroll, initImageSkeletons } from '../composables/usePageBehaviors'
import { useLegalSeo, deriveDescription } from '../composables/useLegalSeo'

const rootEl = ref(null)

useLegalSeo({
  title: 'Полезные статьи — Легал Сервис, Краснодар',
  description: deriveDescription('Делимся практическим опытом и разъясняем сложные юридические темы простым языком: кадастровая стоимость, судебная экспертиза, перепланировка, банкротство.'),
  path: '/articles',
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Полезные статьи', path: '/articles' },
  ],
})

let cleanupFns = []
onMounted(() => {
  cleanupFns.push(initReveal(rootEl.value))
  cleanupFns.push(initHeaderScroll())
  cleanupFns.push(initImageSkeletons(rootEl.value))
})
onBeforeUnmount(() => { cleanupFns.forEach((fn) => fn && fn()); cleanupFns = [] })
</script>
