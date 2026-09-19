<template>
  <main class="container-main">
    <div class="container" ref="rootEl">
      <HeroSection />
      <StatsSection />
      <ServicesCardsSection />
      <IntroSection />
      <CaseResultsSection />
      <AdvantagesSection />
      <TeamSection />
      <EstimateSection />
      <ExpertiseSection />
      <LegalServicesSection />
      <ReviewingSection />
      <AboutSection />
      <ConsultSection />
      <SocialWidgetsSection />
      <MapSection />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import HeroSection from '../components/sections/HeroSection.vue'
import StatsSection from '../components/sections/StatsSection.vue'
import ServicesCardsSection from '../components/sections/ServicesCardsSection.vue'
import IntroSection from '../components/sections/IntroSection.vue'
import CaseResultsSection from '../components/sections/CaseResultsSection.vue'
import AdvantagesSection from '../components/sections/AdvantagesSection.vue'
import TeamSection from '../components/sections/TeamSection.vue'
import EstimateSection from '../components/sections/EstimateSection.vue'
import ExpertiseSection from '../components/sections/ExpertiseSection.vue'
import LegalServicesSection from '../components/sections/LegalServicesSection.vue'
import ReviewingSection from '../components/sections/ReviewingSection.vue'
import AboutSection from '../components/sections/AboutSection.vue'
import ConsultSection from '../components/sections/ConsultSection.vue'
import SocialWidgetsSection from '../components/sections/SocialWidgetsSection.vue'
import MapSection from '../components/sections/MapSection.vue'
import { initReveal, initCounters, initHeaderScroll, initImageSkeletons } from '../composables/usePageBehaviors'
import { useLegalSeo, deriveDescription } from '../composables/useLegalSeo'

const rootEl = ref(null)

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
})

onBeforeUnmount(() => {
  cleanupFns.forEach((fn) => fn && fn())
  cleanupFns = []
})
</script>
