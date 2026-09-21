<template>
  <main class="container-main">
    <div class="container" ref="rootEl">
      <Breadcrumbs :items="[{ name: 'Главная', path: '/' }, { name: 'О компании', path: '/about' }]" />
      <section class="hero">
        <span class="hero-badge">Легал Сервис</span>
        <h1 class="q"><span class="qw">О компании</span> Легал Сервис</h1>
        <p class="e">Оценка, экспертиза и юриспруденция в Краснодарском крае с 2010 года.</p>
      </section>

      <section class="section">
        <div class="feature-grid">
          <div class="feature reveal"><div class="feature__icon">1</div><h3 class="feature__title">Команда</h3><p class="feature__text">Оценщики, эксперты и юристы с профильным образованием.</p></div>
          <div class="feature reveal"><div class="feature__icon">2</div><h3 class="feature__title">СРО и лицензии</h3><p class="feature__text">Все специалисты состоят в СРО.</p></div>
          <div class="feature reveal"><div class="feature__icon">3</div><h3 class="feature__title">Страхование</h3><p class="feature__text">Деятельность застрахована на 100 млн рублей.</p></div>
          <div class="feature reveal"><div class="feature__icon">4</div><h3 class="feature__title">Сроки</h3><p class="feature__text">Оперативное выполнение работ без потери качества.</p></div>
        </div>
      </section>

      <section class="section reveal">
        <h2 class="section-title">Чем мы занимаемся</h2>
        <ul class="list-clean">
          <li>Независимая оценка имущества всех видов</li>
          <li>Судебные и внесудебные экспертизы</li>
          <li>Юридическое сопровождение и представительство в судах</li>
          <li>Рецензирование экспертных заключений</li>
          <li>Оспаривание кадастровой стоимости</li>
        </ul>
      </section>

      <CtaBanner
        title="Нужна консультация по теме «О компании»?"
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
  title: 'О компании Легал Сервис — Легал Сервис, Краснодар',
  description: deriveDescription('Легал Сервис — одна из лидирующих оценочно-экспертных компаний в Краснодарском крае. Оказываем услуги оценки, экспертизы и юриспруденции с 2010 года.'),
  path: '/about',
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'О компании', path: '/about' },
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
