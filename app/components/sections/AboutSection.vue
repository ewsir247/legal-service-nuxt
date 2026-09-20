<template>
  <!-- ======================================================= -->
  <!-- ===== SECTION: О КОМПАНИИ (about + reviews + articles) ===== -->
  <!-- ======================================================= -->
  <section class="section reveal" id="about">
    <div class="hero">
      <span class="hero-badge">Легал Сервис</span>
      <h2 class="section-title">Кто мы и почему нам доверяют</h2>
      <p class="e">Одна из ведущих оценочно-экспертных компаний Краснодарского края — работаем с 2010 года. <NuxtLink to="/about">Подробнее и документы →</NuxtLink></p>
    </div>

    <div class="row row-cols-1 row-cols-md-2 g-4 section-gap-sm">
      <div class="col">
        <div class="testimonial-card">
          <p class="testimonial-card__quote">«Кадастровую стоимость участка им удалось снизить, а я заплатил гораздо меньшую сумму налога»</p>
          <div class="testimonial-card__author">Леня Бобров <span class="testimonial-card__source">— <a href="https://2gis.ru/krasnodar/firm/3237490513537144/tab/reviews" target="_blank" rel="noopener">2ГИС</a></span></div>
        </div>
      </div>
      <div class="col">
        <div class="testimonial-card">
          <p class="testimonial-card__quote">«Обратились по трудовому спору — экспертиза и юрист довели дело до победы в суде»</p>
          <div class="testimonial-card__author">Клиент <span class="testimonial-card__source">— <NuxtLink to="/reviews">отзыв ВКонтакте</NuxtLink></span></div>
        </div>
      </div>
    </div>
    <p class="section-text section-text--left"><NuxtLink to="/reviews">Все отзывы и дипломы специалистов →</NuxtLink></p>

    <h3 class="section-title" style="margin-top:24px;">Полезные статьи</h3>
    <ul class="list-clean">
      <li><NuxtLink to="/articles#art-cadastral">Как оспорить кадастровую стоимость в 2025 году</NuxtLink></li>
      <li><NuxtLink to="/articles#art-expertise">Что нужно знать о судебной экспертизе</NuxtLink></li>
      <li><NuxtLink to="/articles#art-bankruptcy">Банкротство физического лица: за и против</NuxtLink></li>
    </ul>
    <p class="section-text section-text--left"><NuxtLink to="/articles">Все статьи →</NuxtLink></p>
  </section>
</template>
