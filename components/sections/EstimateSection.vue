<template>
  <!-- ======================================================= -->
  <!-- ===== SECTION: ОЦЕНКА (ex /estimate landing)        ===== -->
  <!-- ======================================================= -->
  <section class="section reveal" id="estimate">
    <div class="hero">
      <span class="hero-badge">Легал Сервис</span>
      <h2 class="section-title"><span class="qw">Отчёт об оценке,</span> который банк и суд примут с первого раза</h2>
      <ul class="pain-list">
        <li>Самостоятельная оценка — банк и суд её не примут</li>
        <li>Для каждого объекта своя методика оценки</li>
        <li>Непонятно, сколько стоит отчёт и сколько ждать результат</li>
      </ul>
    </div>

    <div class="row row-cols-1 row-cols-md-3 g-4 section-gap-sm">
      <div class="col">
        <div class="card h-100">
          <img src="/assets/photos/uslugi-po-nezavisimoy-otsenke-nedvizhimosti.png" class="card-img-top" alt="Оценка недвижимости" loading="lazy" decoding="async">
          <div class="card-body"><h5 class="card-title">Недвижимость</h5><p class="card-text">Для ипотеки, наследства, суда или продажи <span class="zx">от 3500 ₽</span></p></div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <img src="/assets/photos/uslugi-po-nezavisimoy-otsenke-transporta.png" class="card-img-top" alt="Оценка транспорта" loading="lazy" decoding="async">
          <div class="card-body"><h5 class="card-title">Транспорт</h5><p class="card-text">Авто, спецтехника, мототранспорт <span class="zx">от 3500 ₽</span></p></div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <img src="/assets/photos/remont-pri-dtp.png" class="card-img-top" alt="Ремонт при ДТП" loading="lazy" decoding="async">
          <div class="card-body"><h5 class="card-title">Ремонт при ДТП</h5><p class="card-text">Реальная стоимость восстановления — для спора со страховой</p></div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <img src="/assets/photos/otsenka-biznesa.png" class="card-img-top" alt="Оценка бизнеса" loading="lazy" decoding="async">
          <div class="card-body"><h5 class="card-title">Бизнес</h5><p class="card-text">Стоимость предприятия, доли или пакета акций <span class="zxc">индивидуально</span></p></div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <img src="/assets/photos/otsenka-oborudovaniya.png" class="card-img-top" alt="Оценка оборудования" loading="lazy" decoding="async">
          <div class="card-body"><h5 class="card-title">Оборудование</h5><p class="card-text">Для залога в банке, продажи или баланса <span class="zx">от 3500 ₽</span></p></div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <img src="/assets/photos/otsenka-ushcherba.jpeg" class="card-img-top" alt="Оценка ущерба" loading="lazy" decoding="async">
          <div class="card-body"><h5 class="card-title">Ущерб</h5><p class="card-text">Ущерб, упущенная выгода, право требования <span class="zxc">индивидуально</span></p></div>
        </div>
      </div>
    </div>

    <h3 class="section-title" style="margin-top:24px;">Как проходит оценка</h3>
    <div class="feature-grid">
      <div class="feature reveal"><div class="feature__icon">1</div><h3 class="feature__title">Документы</h3><p class="feature__text">Передаёте документы на почту или в офис.</p></div>
      <div class="feature reveal"><div class="feature__icon">2</div><h3 class="feature__title">Договор</h3><p class="feature__text">Заключаем договор, выставляем счёт.</p></div>
      <div class="feature reveal"><div class="feature__icon">3</div><h3 class="feature__title">Осмотр</h3><p class="feature__text">Согласовываем дату осмотра объекта.</p></div>
      <div class="feature reveal"><div class="feature__icon">4</div><h3 class="feature__title">Отчёт</h3><p class="feature__text">Готовим отчёт об оценке в срок.</p></div>
    </div>

    <!-- Subsection: оспаривание кадастровой стоимости (концептуально
         часть оценки — нужен отчёт об оценке рыночной стоимости).
         id сохранён для старых ссылок/закладок на /#cadastral-dispute. -->
    <div class="cadastral-sub" id="cadastral-dispute" style="margin-top:14px;">
      <h3 class="section-title">Отдельно: кадастровая стоимость</h3>
      <p class="e">Завышенная кадастровая стоимость — переплата налога. Проверим бесплатно и, если завышена, снизим через комиссию Росреестра или суд с отчётом независимого оценщика.</p>
      <div class="row row-cols-1 row-cols-md-2 g-4 section-gap-sm">
        <div class="col">
          <div class="card h-100 case-card">
            <div class="card-body">
              <div class="case-card__badge">−56,6%</div>
              <h5 class="card-title">Земельный участок, Краснодар</h5>
              <div class="case-card__row"><span class="case-card__old">12 711 077 ₽</span><span class="case-card__arrow">→</span><span class="case-card__new">5 512 000 ₽</span></div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100 case-card">
            <div class="card-body">
              <div class="case-card__badge">−71,2%</div>
              <h5 class="card-title">Коммерческий объект, Краснодар</h5>
              <div class="case-card__row"><span class="case-card__old">21 173 978 ₽</span><span class="case-card__arrow">→</span><span class="case-card__new">6 082 500 ₽</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <CtaBanner
      title="Обсудим вашу задачу по оценке или кадастровой стоимости"
      text="Скажите, какой объект и для какой цели — подскажем подход, срок и стоимость."
    />
  </section>
</template>

<script setup>
import CtaBanner from '../CtaBanner.vue'
</script>
