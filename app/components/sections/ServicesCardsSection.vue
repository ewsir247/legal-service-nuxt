<template>
  <!-- ===== 4 MAIN SERVICE CARDS (anchors, sub-pages removed) ===== -->
  <div class="row row-cols-1 row-cols-md-2 g-4 cards-services section-gap">
    <div class="col">
      <NuxtLink to="#expertise" class="g">
        <div class="card">
          <img src="/assets/photos/provedenie-nezavisimykh-ekspertiz.jpeg" class="card-img-top" alt="Экспертиза" loading="lazy" decoding="async">
          <div class="card-body">
            <h5 class="card-title">Экспертиза</h5>
            <p class="card-text">Заключение, которое выдержит любой суд: строительная, автотехническая, психологическая и ещё 10 видов экспертиз</p>
          </div>
        </div>
      </NuxtLink>
    </div>
    <div class="col">
      <NuxtLink to="#estimate" class="g">
        <div class="card">
          <img src="/assets/photos/otsenka-imushchestva.png" class="card-img-top" alt="Оценка имущества" loading="lazy" decoding="async">
          <div class="card-body">
            <h5 class="card-title">Оценка имущества <span class="card-price-badge">от 3500 ₽</span></h5>
            <p class="card-text">Точная рыночная стоимость для банка, суда или нотариуса — недвижимость, авто, бизнес, оборудование</p>
          </div>
        </div>
      </NuxtLink>
    </div>
    <div class="col">
      <NuxtLink to="#legal-services" class="g">
        <div class="card">
          <img src="/assets/photos/yuridicheskie-uslugi.png" class="card-img-top" alt="Юридические услуги" loading="lazy" decoding="async">
          <div class="card-body">
            <h5 class="card-title">Услуги юриста <span class="card-price-badge">от 5000 ₽</span></h5>
            <p class="card-text">От развода до банкротства и защиты бизнеса в арбитраже — доводим дело до результата</p>
          </div>
        </div>
      </NuxtLink>
    </div>
    <div class="col">
      <NuxtLink to="#reviewing" class="g">
        <div class="card">
          <img src="/assets/photos/retsenzirovanie-ekspertiz.png" class="card-img-top" alt="Рецензирование" loading="lazy" decoding="async">
          <div class="card-body">
            <h5 class="card-title">Рецензирование</h5>
            <p class="card-text">Не согласны с чужой экспертизой? Найдём в ней ошибки и дадим основание для повторной проверки</p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
