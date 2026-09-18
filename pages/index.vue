<template>
  <main class="container-main">
    <div class="container" ref="rootEl">

      <!-- ===== HERO ===== -->
      <h1 class="q">
        Выигрывайте споры <span class="qw">с доказательствами</span>, а не обещаниями
      </h1>
      <h1 class="w">
        Экспертиза, оценка и юридическая защита в Краснодаре — от команды, которой доверяют суды края
      </h1>

      <!-- ===== STATS ===== -->
      <div class="stats-section section-gap" id="statsBlock">
        <div class="stats-section__title">Легал Сервис <span>в цифрах</span></div>
        <div class="stat-item">
          <div class="stat-item__num" data-count="15" data-suffix="+">0<em>+</em></div>
          <div class="stat-item__label">лет работы<br>на рынке юридических услуг</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-item__num" data-count="3000" data-suffix="+" data-format="space">0<em>+</em></div>
          <div class="stat-item__label">успешно выполненных<br>экспертиз и оценок</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-item__num" data-count="80" data-suffix="%">0<em>%</em></div>
          <div class="stat-item__label">клиентов приходят<br>к нам по рекомендации</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-item__num" data-count="100" data-suffix="%">0<em>%</em></div>
          <div class="stat-item__label">деятельность застрахована<br>на 100 млн руб.</div>
        </div>
      </div>

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

      <!-- ===== ABOUT (short) ===== -->
      <div class="container section-gap-sm">
        <h2 class="w">Оценщик, эксперт и юрист — в одной команде</h2>
        <h6 class="e">
          Юрист без экспертизы не докажет ущерб, эксперт без юриста не дойдёт до суда. Мы закрываем весь путь в одном офисе.
        </h6>
      </div>

      <div class="container section-gap-sm" style="text-align:center;">
        <button type="button" class="btn btn-primary btn-lg" @click="openCallbackModal">
          <span class="a">Заказать звонок</span>
        </button>
        <a href="https://wa.me/79282101155" target="_blank" rel="noopener" class="cta-inline-alt">или напишите в WhatsApp</a>
      </div>

      <!-- ===== CASE RESULTS ===== -->
      <div class="container section-gap-sm" style="padding:0">
        <h2 class="w" style="text-align:center;">Не просто цифры в счётчике — вот реальные дела</h2>
      </div>
      <div class="row row-cols-1 row-cols-md-2 g-4 section-gap">
        <div class="col">
          <div class="card h-100 case-card">
            <div class="card-body">
              <div class="case-card__badge">−80,3%</div>
              <h5 class="card-title">Земельный участок, Тихорецк</h5>
              <div class="case-card__row">
                <span class="case-card__old">9 613 099 ₽</span>
                <span class="case-card__arrow">→</span>
                <span class="case-card__new">1 892 500 ₽</span>
              </div>
              <p class="card-text">Самое сильное снижение кадастровой стоимости в нашей практике — почти в 5 раз.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100 case-card">
            <div class="card-body">
              <div class="case-card__badge">−37,5%</div>
              <h5 class="card-title">Арендуемый земельный участок, Анапа</h5>
              <div class="case-card__row">
                <span class="case-card__old">762 750 491 ₽</span>
                <span class="case-card__arrow">→</span>
                <span class="case-card__new">476 257 000 ₽</span>
              </div>
              <p class="card-text">Крупный объект — снижение почти на 287 млн ₽ кадастровой стоимости.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="container section-gap-sm" style="padding:0;text-align:center;">
        <NuxtLink to="#cadastral-dispute" class="btn btn-outline-primary btn-lg">
          <span class="a">Смотреть все результаты по кадастровой стоимости →</span>
        </NuxtLink>
      </div>

      <!-- ===== ADVANTAGES ===== -->
      <div class="row row-cols-1 row-cols-md-3 g-4 cards-advantages section-gap">
        <div class="col">
          <div class="card h-100">
            <img src="/assets/photos/komanda-professionalov.png" class="card-img-top" alt="Команда профессионалов" loading="lazy" decoding="async">
            <div class="card-body">
              <h5 class="card-title">Команда профессионалов</h5>
              <p class="card-text">Дипломы и сертификаты каждого специалиста — в открытом доступе на сайте</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src="/assets/photos/raznostoronniy-opyt.png" class="card-img-top" alt="Разносторонний опыт" loading="lazy" decoding="async">
            <div class="card-body">
              <h5 class="card-title">Разносторонний опыт</h5>
              <p class="card-text">От частных споров до банкротства юрлиц</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src="/assets/photos/kompleksnyy-podkhod.png" class="card-img-top" alt="Комплексный подход" loading="lazy" decoding="async">
            <div class="card-body">
              <h5 class="card-title">Комплексный подход</h5>
              <p class="card-text">Экспертиза, оценка и юрист работают как одна команда</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src="/assets/photos/kachestvo-i-operativnost.png" class="card-img-top" alt="Качество и оперативность" loading="lazy" decoding="async">
            <div class="card-body">
              <h5 class="card-title">Качество и оперативность</h5>
              <p class="card-text">Заключение за 1–3 дня — сроки называем сразу и держим их</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src="/assets/photos/otvetstvennost.png" class="card-img-top" alt="Ответственность" loading="lazy" decoding="async">
            <div class="card-body">
              <h5 class="card-title">Ответственность</h5>
              <p class="card-text">Каждый специалист лично отвечает за своё заключение</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src="/assets/photos/otsutstvie-riskov.png" class="card-img-top" alt="Отсутствие рисков" loading="lazy" decoding="async">
            <div class="card-body">
              <h5 class="card-title">Отсутствие рисков</h5>
              <p class="card-text">Профессиональная ответственность застрахована</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== TEAM ===== -->
      <div class="container section-gap-sm" style="padding:0">
        <h2 class="w" style="text-align:center;">С кем вы будете работать</h2>
      </div>
      <div class="row row-cols-1 row-cols-md-3 g-4 section-gap">
        <div class="col">
          <div class="card h-100 team-card">
            <div class="team-card__avatar">И</div>
            <div class="card-body">
              <h5 class="card-title">Ильинов Дмитрий Сергеевич</h5>
              <p class="team-card__role">Руководитель строительно-технической экспертизы · 6+ лет</p>
              <p class="team-card__creds">Дипломы КубГТУ, сертификат судебного эксперта, ответственность застрахована на 15 млн ₽. <NuxtLink to="/reviews#ilinov">Смотреть дипломы →</NuxtLink></p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100 team-card">
            <div class="team-card__avatar">К</div>
            <div class="card-body">
              <h5 class="card-title">Коржов Николай Николаевич</h5>
              <p class="team-card__role">Генеральный директор · 10+ лет</p>
              <p class="team-card__creds">Диплом юриста Краснодарского юридического института МВД России. <NuxtLink to="/reviews#korgov">Смотреть дипломы →</NuxtLink></p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100 team-card">
            <div class="team-card__avatar">М</div>
            <div class="card-body">
              <h5 class="card-title">Митраков Алексей Николаевич</h5>
              <p class="team-card__role">Руководитель транспортной экспертизы · 8+ лет</p>
              <p class="team-card__creds">Право на независимую техническую экспертизу ТС. <NuxtLink to="/reviews#mitrakov">Смотреть дипломы →</NuxtLink></p>
            </div>
          </div>
        </div>
      </div>

      <!-- ======================================================= -->
      <!-- ===== SECTION: ОЦЕНКА (ex /estimate landing)        ===== -->
      <!-- ======================================================= -->
      <section class="section reveal" id="estimate">
        <div class="hero">
          <span class="hero-badge">Легал Сервис</span>
          <h2 class="section-title"><span class="qw">Отчёт об оценке,</span> который банк и суд примут с первого раза</h2>
          <p class="e">Недвижимость, транспорт, бизнес, оборудование и ущерб — с обоснованием по ФЗ №135, а не «на глаз».</p>
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
        <div class="cadastral-sub reveal" id="cadastral-dispute" style="margin-top:32px;">
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

      <!-- ======================================================= -->
      <!-- ===== SECTION: ЭКСПЕРТИЗА (ex /pre-trial landing)   ===== -->
      <!-- ======================================================= -->
      <section class="section reveal" id="expertise">
        <div class="hero">
          <span class="hero-badge">Легал Сервис</span>
          <h2 class="section-title">У вас есть мнение. У суда есть <span class="qw">только факты</span></h2>
          <p class="e">Ремонт после ДТП, ущерб от залива, качество стройки, подлинность подписи — экспертиза переводит спор в факты.</p>
          <ul class="pain-list">
            <li>Ущерб после ДТП, пожара или залива не подтверждён документально</li>
            <li>Страховая или виновник спорят с вашей версией событий</li>
            <li>Подлинность подписи в документе оспаривается</li>
          </ul>
        </div>

        <div class="row row-cols-1 row-cols-md-3 g-4 section-gap-sm">
          <div class="col"><div class="card h-100"><img src="/assets/photos/sudebnaya-ekspertiza.png" class="card-img-top" alt="Судебная экспертиза" loading="lazy" decoding="async"><div class="card-body"><h5 class="card-title">Судебная экспертиза</h5><p class="card-text">По определению суда — заключение сразу оформлено как требует процесс</p></div></div></div>
          <div class="col"><div class="card h-100"><img src="/assets/photos/ekspertiza-pri-dtp.jpeg" class="card-img-top" alt="Экспертиза при ДТП" loading="lazy" decoding="async"><div class="card-body"><h5 class="card-title">Экспертиза при ДТП</h5><p class="card-text">Устанавливаем реальный механизм аварии</p></div></div></div>
          <div class="col"><div class="card h-100"><img src="/assets/photos/stroitelnaya-ekspertiza.jpeg" class="card-img-top" alt="Строительная экспертиза" loading="lazy" decoding="async"><div class="card-body"><h5 class="card-title">Строительная экспертиза</h5><p class="card-text">Доказываем некачественный ремонт или самовольную стройку</p></div></div></div>
          <div class="col"><div class="card h-100"><img src="/assets/photos/ekspertiza-dokumentov.jpeg" class="card-img-top" alt="Экспертиза документов" loading="lazy" decoding="async"><div class="card-body"><h5 class="card-title">Экспертиза документов</h5><p class="card-text">Проверяем документ на подделку и дописки</p></div></div></div>
          <div class="col"><div class="card h-100"><img src="/assets/photos/psikhologicheskaya-ekspertiza.png" class="card-img-top" alt="Психологическая экспертиза" loading="lazy" decoding="async"><div class="card-body"><h5 class="card-title">Психологическая экспертиза</h5><p class="card-text">Для суда — по спорам о детях и сделкам под сомнением</p></div></div></div>
          <div class="col"><div class="card h-100"><img src="/assets/photos/pocherkovedcheskaya-ekspertiza.png" class="card-img-top" alt="Почерковедческая экспертиза" loading="lazy" decoding="async"><div class="card-body"><h5 class="card-title">Почерковедческая экспертиза</h5><p class="card-text">Докажем подлинность или подделку подписи</p></div></div></div>
        </div>

        <h3 class="section-title" style="margin-top:24px;">Что вы получаете</h3>
        <ul class="list-clean">
          <li>Заключение, оформленное строго по процессуальным нормам</li>
          <li>Эксперта с профильным образованием и сертификатом соответствия</li>
          <li>Дипломы экспертов, открытые для проверки в разделе «Отзывы»</li>
        </ul>

        <CtaBanner
          title="Нужна независимая или судебная экспертиза?"
          text="Расскажите о ситуации — подскажем, какая экспертиза нужна."
        />
      </section>

      <!-- ======================================================= -->
      <!-- ===== SECTION: ЮРИДИЧЕСКИЕ УСЛУГИ                    ===== -->
      <!-- ======================================================= -->
      <section class="section reveal" id="legal-services">
        <div class="hero">
          <span class="hero-badge">Легал Сервис</span>
          <h2 class="section-title"><span class="qw">Юрист, который доводит дело до результата</span>, а не просто «сопровождает»</h2>
          <p class="e">Земельные, трудовые и арбитражные споры, жилищные и семейные дела, сделки с недвижимостью — каждое направление ведёт профильный юрист.</p>
          <ul class="pain-list">
            <li>Нужен не универсал, а юрист с опытом именно в вашей теме</li>
            <li>Опасаетесь цены «с потолка» ещё до того, как посмотрели документы</li>
          </ul>
        </div>

        <div class="feature-grid">
          <div class="feature reveal"><div class="feature__icon">1</div><h3 class="feature__title">Семейные споры</h3><p class="feature__text">Развод, алименты, раздел имущества.</p></div>
          <div class="feature reveal"><div class="feature__icon">2</div><h3 class="feature__title">Земля и жильё</h3><p class="feature__text">Приватизация, разрешение на строительство.</p></div>
          <div class="feature reveal"><div class="feature__icon">3</div><h3 class="feature__title">Трудовые и арбитражные споры</h3><p class="feature__text">Претензии, иски, представительство в суде.</p></div>
          <div class="feature reveal"><div class="feature__icon">4</div><h3 class="feature__title">Наследство</h3><p class="feature__text">Оформление и восстановление сроков.</p></div>
        </div>

        <h3 class="section-title" style="margin-top:24px;">Сколько это стоит</h3>
        <ul class="list-clean">
          <li>Раздел имущества при разводе <span class="zx">от 10 000 ₽</span></li>
          <li>Разрешение на строительство <span class="zx">от 10 000 ₽</span></li>
          <li>Трудовые споры <span class="zx">от 10 000 ₽</span></li>
          <li>Сопровождение сделок с недвижимостью <span class="zx">от 5 000 ₽</span></li>
          <li>Ведение дел в суде <span class="zx">от 10 000 ₽</span></li>
        </ul>
        <p class="section-text section-text--left">Точную стоимость назовём после бесплатной консультации.</p>

        <CtaBanner
          title="Получите план действий по вашей ситуации"
          text="Напишите в чат — профильный юрист ответит в ближайшее время."
        />
      </section>

      <!-- ======================================================= -->
      <!-- ===== SECTION: РЕЦЕНЗИРОВАНИЕ                        ===== -->
      <!-- ======================================================= -->
      <section class="section reveal" id="reviewing">
        <div class="hero">
          <span class="hero-badge">Легал Сервис</span>
          <h2 class="section-title">Не согласны с чужой <span class="qw">экспертизой?</span> Докажем, где она неправа</h2>
          <p class="e">Мотивированная рецензия — законный способ оспорить экспертизу не в вашу пользу: строительную, оценочную, автотехническую, документоведческую, почерковедческую, медицинскую.</p>
        </div>

        <div class="feature-grid">
          <div class="feature reveal"><div class="feature__icon">1</div><h3 class="feature__title">Строительная</h3><p class="feature__text">Строительно-техническая и землеустроительная.</p></div>
          <div class="feature reveal"><div class="feature__icon">2</div><h3 class="feature__title">Оценочная</h3><p class="feature__text">Рецензия на отчёты об оценке.</p></div>
          <div class="feature reveal"><div class="feature__icon">3</div><h3 class="feature__title">Автотехническая</h3><p class="feature__text">Анализ обстоятельств ДТП.</p></div>
          <div class="feature reveal"><div class="feature__icon">4</div><h3 class="feature__title">Документоведческая</h3><p class="feature__text">Давность изготовления документов.</p></div>
          <div class="feature reveal"><div class="feature__icon">5</div><h3 class="feature__title">Почерковедческая</h3><p class="feature__text">Исследование подписей и текстов.</p></div>
          <div class="feature reveal"><div class="feature__icon">6</div><h3 class="feature__title">Медицинская</h3><p class="feature__text">Выводы судебно-медицинской экспертизы.</p></div>
        </div>

        <p class="section-text section-text--left">Рецензия — основание ходатайствовать о повторной экспертизе.</p>

        <CtaBanner
          title="Нужна консультация по рецензированию экспертиз?"
          text="Опишите ситуацию в чате — подскажем, как мы можем помочь."
        />
      </section>

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

      <!-- ===== SOCIAL MESSENGERS ===== -->
      <div class="social-widgets-section section-gap">
        <p class="social-widgets-section__title">Или выберите другой способ связи</p>
        <div class="social-widgets">
          <a href="tel:88612901155" class="social-widget-btn social-widget-btn--phone">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 12.63 19.79 19.79 0 01.07 4.12 2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            8 (861) 290-11-55
          </a>
          <a href="https://vk.com/legal23ru" target="_blank" rel="noopener" class="social-widget-btn social-widget-btn--vk">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.45h-1.64c-.62 0-.81-.49-1.92-1.61-1-.95-1.41-1.08-1.65-1.08-.33 0-.43.09-.43.56v1.47c0 .4-.13.64-1.18.64-1.74 0-3.67-1.05-5.03-3.02C4.73 9.95 4.24 8 4.24 7.6c0-.24.09-.47.56-.47h1.64c.42 0 .58.19.74.64.82 2.36 2.19 4.43 2.76 4.43.21 0 .31-.1.31-.64V9.44c-.07-1.15-.67-1.25-.67-1.65 0-.2.16-.4.42-.4h2.58c.36 0 .48.19.48.61v3.26c0 .36.16.49.27.49.21 0 .39-.13.78-.52 1.21-1.35 2.07-3.43 2.07-3.43.11-.24.33-.47.74-.47h1.64c.49 0 .6.26.49.61-.2.94-2.18 3.73-2.18 3.73-.17.28-.24.41 0 .71.17.23.74.71 1.12 1.14.69.78 1.22 1.43 1.36 1.88.15.44-.08.67-.53.67z"/></svg>
            ВКонтакте
          </a>
          <a href="https://wa.me/79282101155" target="_blank" rel="noopener" class="social-widget-btn social-widget-btn--wa">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.52 14.19c-.23.65-1.35 1.27-1.86 1.35-.48.07-1.07.1-1.72-.11-.4-.12-.9-.29-1.56-.56-2.73-1.18-4.52-3.94-4.66-4.12-.14-.18-1.13-1.5-1.13-2.86 0-1.36.71-2.03 1-2.3.26-.25.56-.32.74-.32l.53.01c.17 0 .39-.06.62.47l.88 2.14c.07.17.12.37.01.58-.11.21-.17.34-.34.52l-.51.54c-.17.17-.35.36-.15.7.2.34.89 1.47 1.91 2.38 1.31 1.17 2.42 1.53 2.76 1.7.34.17.54.14.74-.08l.5-.58c.2-.23.4-.19.67-.08l2.11.99c.31.15.51.22.58.34.07.12.07.69-.16 1.34z"/></svg>
            WhatsApp
          </a>
          <a href="https://max.ru/79282101155" target="_blank" rel="noopener" class="social-widget-btn social-widget-btn--max">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l5.07-1.37C8.53 21.5 10.23 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>
            MAX
          </a>
        </div>
      </div>

      <!-- ===== MAP ===== -->
      <div class="map-section section-gap">
        <div class="map-section__header">
          <h3>Адрес офиса</h3>
          <p>Мы находимся в удобном месте Краснодара — приходите к нам лично</p>
          <div class="map-section__address-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            г. Краснодар, ул. Дзержинского, 8/1
          </div>
          <a href="https://2gis.ru/krasnodar/firm/3237490513537144" target="_blank" rel="noopener" class="map-section__2gis-link">Открыть в 2ГИС →</a>
        </div>
        <div class="map-wrapper">
          <iframe
            ref="mapFrameEl"
            allowfullscreen
            title="Карта — ООО Легал Сервис, Краснодар, ул. Дзержинского 8/1"
          ></iframe>
        </div>
      </div>

    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { openCallbackModal } from '../composables/useCallbackModal'
import { initReveal, initCounters, initHeaderScroll, initImageSkeletons } from '../composables/usePageBehaviors'
import { useLegalSeo, deriveDescription } from '../composables/useLegalSeo'

const rootEl = ref(null)
const mapFrameEl = ref(null)

const title = 'Легал Сервис — юридические услуги, экспертиза и оценка в Краснодаре'
const description = deriveDescription(
  'Выигрывайте споры с доказательствами. Экспертиза, оценка и юридическая защита в Краснодаре. 15 лет опыта, 3000+ выполненных дел. Оценка имущества, судебная экспертиза, юридические услуги, рецензирование экспертиз, оспаривание кадастровой стоимости.'
)
useLegalSeo({ title, description, path: '/' })

let cleanupFns = []

onMounted(() => {
  cleanupFns.push(initReveal(rootEl.value))
  cleanupFns.push(initCounters(rootEl.value))
  cleanupFns.push(initHeaderScroll())
  cleanupFns.push(initImageSkeletons(rootEl.value))

  // Lazy-load the map once it scrolls into view. 2GIS's firm widget
  // (widgets.2gis.com) needs a per-organization code generated through their
  // own UI ("Поделиться → Вставить на сайт") — a bare firm id is not enough
  // and returned "Something went wrong" in testing. OpenStreetMap's public
  // embed needs no key/token and always works, with the pin already centred
  // on the office — the "Открыть в 2ГИС" button below covers the 2ГИС link.
  if (mapFrameEl.value && 'IntersectionObserver' in window) {
    const src = 'https://www.openstreetmap.org/export/embed.html?bbox=38.9664533%2C45.0443012%2C38.9924533%2C45.0703012&layer=mapnik&marker=45.0573012%2C38.9794533'
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          mapFrameEl.value.src = src
          io.disconnect()
        }
      })
    }, { rootMargin: '200px' })
    io.observe(mapFrameEl.value)
    cleanupFns.push(() => io.disconnect())
  }
})

onBeforeUnmount(() => {
  cleanupFns.forEach((fn) => fn && fn())
  cleanupFns = []
})
</script>
