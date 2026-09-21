<template>
  <main class="container-main">
    <div class="container" ref="rootEl">
      <Breadcrumbs :items="[{ name: 'Главная', path: '/' }, { name: 'Отзывы и документы', path: '/reviews' }]" />
      <section class="hero">
        <span class="hero-badge">Легал Сервис</span>
        <h1 class="q"><span class="qw">Отзывы</span> и документы</h1>
        <p class="e">Благодарственные письма, отзывы клиентов, дипломы и сертификаты специалистов — доказательства, а не обещания.</p>
      </section>

      <section class="section reveal">
        <h2 class="section-title">С кем вы будете работать</h2>
        <p class="e">Дипломы ниже — не абстрактная «команда», а три специалиста, которые лично ведут ваше дело.</p>
        <div class="row row-cols-1 row-cols-md-3 g-4 section-gap">
          <div class="col" v-for="s in specialists" :key="s.id">
            <div class="card h-100 team-card">
              <div class="team-card__avatar">{{ s.avatar }}</div>
              <div class="card-body">
                <h5 class="card-title">{{ s.name }}</h5>
                <p class="team-card__role">{{ s.role }}</p>
                <p class="team-card__creds"><a :href="'#' + s.id">Смотреть дипломы ↓</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section reveal">
        <h2 class="section-title">Благодарственные письма</h2>
        <p class="e">Организации и учреждения, с которыми мы работали.</p>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 section-gap">
          <div class="col" v-for="l in letters" :key="l.img">
            <a :href="'/assets/documents/' + l.img" target="_blank" rel="noopener" class="g">
              <div class="card">
                <img :src="'/assets/documents/' + l.img" class="card-img-top" :alt="l.title" loading="lazy" decoding="async">
                <div class="card-body"><h5 class="card-title">{{ l.title }}</h5></div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section class="section reveal">
        <h2 class="section-title">Отзывы во ВКонтакте</h2>
        <p class="e">Скриншоты реальных обращений клиентов из нашей группы <a href="https://vk.com/legal23ru" target="_blank" rel="noopener">ВКонтакте</a>.</p>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 section-gap">
          <div class="col" v-for="r in vkReviews" :key="r.img">
            <a :href="'/assets/documents/' + r.img" target="_blank" rel="noopener" class="g">
              <div class="card">
                <img :src="'/assets/documents/' + r.img" class="card-img-top" :alt="r.title" loading="lazy" decoding="async">
                <div class="card-body"><h5 class="card-title">{{ r.title }}</h5></div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section class="section reveal">
        <h2 class="section-title">Документы и сертификаты специалистов</h2>
        <p class="e">Дипломы, сертификаты соответствия и полисы страхования профессиональной ответственности.</p>

        <div v-for="s in specialists" :key="s.id">
          <h3 :id="s.id" class="section-title" style="font-size:1.3rem;margin-top:32px;">{{ s.name }} — {{ s.role }}</h3>
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 section-gap">
            <div class="col" v-for="d in s.diplomas" :key="d.img">
              <a :href="'/assets/documents/' + d.img" target="_blank" rel="noopener" class="g">
                <div class="card">
                  <img :src="'/assets/documents/' + d.img" class="card-img-top" :alt="d.title" loading="lazy" decoding="async">
                  <div class="card-body"><h5 class="card-title">{{ d.title }}</h5></div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="section reveal">
        <h2 class="section-title">Нам доверяют суды</h2>
        <p class="e">Судебные экспертизы компании принимают следующие суды Краснодарского края и Республики Адыгея:</p>
        <ul class="list-clean">
          <li v-for="c in courts" :key="c.url"><a :href="c.url" target="_blank" rel="noopener">{{ c.name }}</a></li>
        </ul>
      </section>

      <CtaBanner
        title="Нужна консультация по теме «Отзывы и документы»?"
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
  title: 'Отзывы клиентов — Легал Сервис, Краснодар',
  description: deriveDescription('Благодарственные письма от организаций, отзывы клиентов, дипломы и сертификаты специалистов Легал Сервис.'),
  path: '/reviews',
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Отзывы и документы', path: '/reviews' },
  ],
})

const letters = [
  { img: 'letter-dsu7.jpg', title: 'ДСУ № 7' },
  { img: 'letter-dom-mechty.jpg', title: 'Группа компаний «Дом мечты»' },
  { img: 'letter-fabrika-oken.jpg', title: '«Фабрика дышащих окон»' },
  { img: 'letter-solli.jpg', title: 'ООО «Солли»' },
  { img: 'letter-prokuratura.jpg', title: 'Прокуратура Западного округа г. Краснодара' },
  { img: 'letter-vintorg.jpg', title: 'ООО «Винторг»' },
  { img: 'letter-kubanremstroy.jpg', title: 'ООО «Кубаньремстрой-2»' },
  { img: 'letter-firma-yug.jpg', title: 'ООО «Фирма-Юг-Универсал»' },
  { img: 'letter-krasnaya-zvezda.jpg', title: 'ООО «Красная Звезда»' },
  { img: 'letter-korenovskoe.jpg', title: 'ФГУП «Кореновское»' },
  { img: 'letter-kubanpassavtoservis.jpg', title: 'АФ «Кубаньпассажиравтосервис»' },
  { img: 'letter-01.jpg', title: 'Благодарственное письмо' },
  { img: 'letter-02.jpg', title: 'Благодарственное письмо' },
  { img: 'letter-03.jpg', title: 'Благодарственное письмо' },
  { img: 'letter-04.jpg', title: 'Благодарственное письмо' },
  { img: 'letter-05.jpg', title: 'Благодарственное письмо' },
  { img: 'letter-06.jpg', title: 'Благодарственное письмо' },
]

const vkReviews = [
  { img: 'vk-review-01.jpg', title: 'Отзыв клиента ВКонтакте' },
  { img: 'vk-review-02.jpg', title: 'Отзыв клиента ВКонтакте' },
  { img: 'vk-review-03.jpg', title: 'Отзыв клиента ВКонтакте' },
  { img: 'vk-review-kadastr.jpg', title: 'Снижение кадастровой стоимости — отзыв клиента' },
]

const specialists = [
  {
    id: 'ilinov',
    avatar: 'И',
    name: 'Ильинов Дмитрий Сергеевич',
    role: 'Руководитель отдела строительно-технической экспертизы · 6+ лет',
    diplomas: [
      { img: 'diplom-ilinov-stroitelstvo.jpg', title: 'Диплом КубГТУ «Промышленное и гражданское строительство»' },
      { img: 'diplom-ilinov-ocenka-biznesa.jpg', title: 'Диплом КубГТУ «Оценка стоимости предприятия (бизнеса)»' },
      { img: 'diplom-ilinov-tehekspertiza.jpg', title: 'Диплом о переподготовке «Независимая техническая экспертиза транспортных средств»' },
      { img: 'diplom-ilinov-sudebnaya-stroitelnaya.jpg', title: 'Диплом «Судебная строительно-техническая и стоимостная экспертиза объектов недвижимости»' },
      { img: 'sertifikat-ilinov-stroitelnaya-ekspertiza.jpg', title: 'Сертификат соответствия в области строительно-технической экспертизы' },
      { img: 'sertifikat-ilinov-sudebnaya-ekspertiza.jpg', title: 'Сертификат соответствия в области судебной экспертизы' },
      { img: 'strahovanie-ilinov.jpg', title: 'Страхование ответственности — Альфа-Страхование, 15 млн руб.' },
      { img: 'svidetelstvo-ilinov-sro.jpg', title: 'Свидетельство СРО «Региональная ассоциация оценщиков ЮФО»' },
      { img: 'svidetelstvo-ilinov-rsa.jpg', title: 'Свидетельство РСА (Российский союз автостраховщиков)' },
    ],
  },
  {
    id: 'korgov',
    avatar: 'К',
    name: 'Коржов Николай Николаевич',
    role: 'Генеральный директор, юрист, автотехническая и строительная экспертиза',
    diplomas: [
      { img: 'diplom-korgov-yurisprudenciya.jpg', title: 'Диплом юриста «Юриспруденция», Краснодарский юридический институт МВД России' },
      { img: 'diplom-korgov-menedzher.jpg', title: 'Диплом менеджера, Всероссийский заочный финансово-экономический институт' },
      { img: 'diplom-korgov-tehekspertiza.jpg', title: 'Диплом о переподготовке «Независимая техническая экспертиза транспортных средств»' },
      { img: 'diplom-korgov-ocenka.jpg', title: 'Диплом о переподготовке «Оценочная деятельность»' },
      { img: 'diplom-korgov-sudebnaya-stroitelnaya.jpg', title: 'Диплом «Судебная строительно-техническая и стоимостная экспертиза объектов недвижимости»' },
      { img: 'diplom-korgov-sudebnaya-avtotehnicheskaya.jpg', title: 'Диплом «Судебная автотехническая и стоимостная экспертиза транспортных средств»' },
      { img: 'sertifikat-korgov-avtoekspertiza.jpg', title: 'Сертификат соответствия в области автотехнической экспертизы' },
      { img: 'sertifikat-korgov-stroitelnaya-ekspertiza.jpg', title: 'Сертификат соответствия в области строительно-технической экспертизы' },
      { img: 'sertifikat-korgov-sudebnaya-ekspertiza.jpg', title: 'Сертификат соответствия в области судебной экспертизы' },
      { img: 'strahovanie-korgov.jpg', title: 'Страхование ответственности — Альфа-Страхование, 15 млн руб.' },
      { img: 'svidetelstvo-korgov-ocenshchik.jpg', title: 'Выписка из реестра Региональной ассоциации оценщиков ЮФО' },
      { img: 'svidetelstvo-korgov-sro.jpg', title: 'Выписка из реестра Ассоциации технических экспертов' },
    ],
  },
  {
    id: 'mitrakov',
    avatar: 'М',
    name: 'Митраков Алексей Николаевич',
    role: 'Руководитель отдела транспортной экспертизы',
    diplomas: [
      { img: 'diplom-mitrakov-tehekspertiza.jpg', title: 'Право на ведение деятельности в сфере независимой технической экспертизы транспортных средств' },
      { img: 'diplom-mitrakov-mehanizaciya.jpg', title: 'Диплом «Механизация сельского хозяйства»' },
      { img: 'diplom-mitrakov-sudebnaya-avtotehnicheskaya.jpg', title: 'Диплом о переподготовке «Судебная автотехническая экспертиза транспортных средств»' },
      { img: 'sertifikat-mitrakov-avtoekspertiza.jpg', title: 'Сертификат соответствия по автотехнической экспертизе' },
      { img: 'sertifikat-mitrakov-sudebnaya-ekspertiza.jpg', title: 'Сертификат соответствия в области судебной экспертизы' },
      { img: 'strahovanie-mitrakov.jpg', title: 'Страхование ответственности — Альфа-Страхование, 15 млн руб.' },
      { img: 'svidetelstvo-mitrakov-sro.jpg', title: 'Член СРО «Региональная ассоциация оценщиков ЮФО»' },
      { img: 'svidetelstvo-mitrakov-assoc.jpg', title: 'Член СРО «Ассоциация технических экспертов»' },
      { img: 'vypiska-mitrakov-reestr.jpg', title: 'Выписка из реестра саморегулируемой организации оценщиков' },
    ],
  },
]

const courts = [
  { name: 'Арбитражный суд Краснодарского края', url: 'http://krasnodar.arbitr.ru' },
  { name: 'Лабинский районный суд', url: 'http://labinsk.krd.sudrf.ru' },
  { name: 'Ленинградский районный суд', url: 'http://leningradskay.krd.sudrf.ru' },
  { name: 'Ленинский районный суд г. Краснодара', url: 'http://krasnodar-leninsky.krd.sudrf.ru' },
  { name: 'Первомайский районный суд г. Краснодара', url: 'http://pervomaisky.krd.sudrf.ru' },
  { name: 'Прикубанский районный суд г. Краснодара', url: 'http://krasnodar-prikubansky.krd.sudrf.ru' },
  { name: 'Приморско-Ахтарский районный суд', url: 'http://primorsko-axtarsky.krd.sudrf.ru' },
  { name: 'Советский районный суд г. Краснодара', url: 'http://krasnodar-sovetsky.krd.sudrf.ru' },
  { name: 'Северский районный суд', url: 'http://seversky.krd.sudrf.ru' },
  { name: 'Славянский районный суд', url: 'http://slavynsky.krd.sudrf.ru' },
  { name: 'Тахтамукайский районный суд Республики Адыгея', url: 'http://tahtamukaysky.adg.sudrf.ru' },
  { name: 'Теучежский районный суд Республики Адыгея', url: 'http://teuchezhsky.adg.sudrf.ru' },
]

let cleanupFns = []
onMounted(() => {
  cleanupFns.push(initReveal(rootEl.value))
  cleanupFns.push(initHeaderScroll())
  cleanupFns.push(initImageSkeletons(rootEl.value))
})
onBeforeUnmount(() => { cleanupFns.forEach((fn) => fn && fn()); cleanupFns = [] })
</script>
