<template>
  <div>
    <a href="#main" class="skip-link">К основному содержанию</a>
    <AppHeader />
    <main id="main" tabindex="-1" class="container-main">
      <div class="container">
        <section class="hero">
          <span class="hero-badge">Легал Сервис</span>
          <h1 class="q">{{ isNotFound ? 'Страница не найдена' : 'Что-то пошло не так' }}</h1>
          <p class="e">
            {{ isNotFound
              ? 'Страница могла быть перемещена или удалена. Попробуйте перейти на главную или в один из разделов ниже.'
              : 'Произошла техническая ошибка. Попробуйте обновить страницу или вернуться позже — мы уже разбираемся.' }}
          </p>
        </section>

        <section class="section reveal">
          <div class="row row-cols-1 row-cols-md-2 g-4 section-gap">
            <div class="col">
              <NuxtLink to="/" class="g">
                <div class="card h-100">
                  <div class="card-body">
                    <h3 class="card-title">Главная страница</h3>
                    <p class="card-text">Вернуться на главную и посмотреть все услуги компании.</p>
                  </div>
                </div>
              </NuxtLink>
            </div>
            <div class="col">
              <NuxtLink to="/#estimate" class="g">
                <div class="card h-100">
                  <div class="card-body">
                    <h3 class="card-title">Оценка</h3>
                    <p class="card-text">Независимая оценка недвижимости, транспорта, бизнеса и оборудования.</p>
                  </div>
                </div>
              </NuxtLink>
            </div>
            <div class="col">
              <NuxtLink to="/#legal-services" class="g">
                <div class="card h-100">
                  <div class="card-body">
                    <h3 class="card-title">Юридические услуги</h3>
                    <p class="card-text">Сопровождение споров, представительство в судах, экспертиза документов.</p>
                  </div>
                </div>
              </NuxtLink>
            </div>
            <div class="col">
              <NuxtLink to="/reviews" class="g">
                <div class="card h-100">
                  <div class="card-body">
                    <h3 class="card-title">Отзывы и документы</h3>
                    <p class="card-text">Благодарственные письма, отзывы клиентов, дипломы и сертификаты специалистов.</p>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>

          <div class="container btn-center" style="padding:0;">
            <button type="button" class="btn" @click="openCallbackModal">
              <span class="a">Заказать звонок</span>
            </button>
          </div>
        </section>
      </div>
    </main>
    <AppFooter />
    <CallbackWidget />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import CallbackWidget from './components/CallbackWidget.vue'
import { openCallbackModal } from './composables/useCallbackModal'

const props = defineProps({
  error: {
    type: Object,
    default: () => ({}),
  },
})

const isNotFound = computed(() => props.error?.statusCode === 404)

useHead({
  title: computed(() => (isNotFound.value ? 'Страница не найдена — Легал Сервис' : 'Ошибка — Легал Сервис')),
})
</script>
