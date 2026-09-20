<template>
  <!-- ===== MAP ===== -->
  <div class="map-section section-gap">
    <div class="map-section__header">
      <h3>Адрес офиса</h3>
      <p>Мы находимся в удобном месте Краснодара — приходите к нам лично</p>
      <div class="map-section__address-tag">
        <MapPin :size="14" :stroke-width="2" />
        г. Краснодар, ул. Дзержинского, 8/1
      </div>
      <a href="https://2gis.ru/krasnodar/firm/3237490513537144" target="_blank" rel="noopener" class="map-section__2gis-link">Открыть в 2ГИС →</a>
    </div>
    <div class="map-wrapper">
      <div v-if="useDgis" ref="mapContainerEl" class="map-gl-container"></div>
      <iframe
        v-else
        ref="mapFrameEl"
        allowfullscreen
        title="Карта — ООО Легал Сервис, Краснодар, ул. Дзержинского 8/1"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { MapPin } from 'lucide-vue-next'

const mapFrameEl = ref(null)
const mapContainerEl = ref(null)

// 2GIS MapGL: used when a public API key is configured (platform.2gis.ru).
// Without a key we fall back to the OpenStreetMap embed below, so the map
// never shows an empty/broken state regardless of deployment config.
const dgisApiKey = useRuntimeConfig().public.dgisApiKey
const useDgis = !!dgisApiKey
const OFFICE_COORDS = [38.9794533, 45.0573012] // MapGL order: [lon, lat]
let dgisMap = null
let observer = null

function loadDgisSdk() {
  return new Promise((resolve, reject) => {
    if (window.mapgl) { resolve(window.mapgl); return }
    const script = document.createElement('script')
    script.src = 'https://mapgl.2gis.com/api/js/v1'
    script.async = true
    script.onload = () => resolve(window.mapgl)
    script.onerror = () => reject(new Error('Failed to load 2GIS MapGL SDK'))
    document.head.appendChild(script)
  })
}

async function initDgisMap() {
  try {
    const mapgl = await loadDgisSdk()
    if (!mapContainerEl.value) return
    dgisMap = new mapgl.Map(mapContainerEl.value, {
      center: OFFICE_COORDS,
      zoom: 16,
      key: dgisApiKey,
    })
    new mapgl.Marker(dgisMap, { coordinates: OFFICE_COORDS })
  } catch (e) {
    // Silently ignore — the "Открыть в 2ГИС" link still works either way.
  }
}

onMounted(() => {
  // Lazy-load the map once it scrolls into view. If a 2GIS MapGL API key is
  // configured, load the real 2GIS map + marker; otherwise fall back to the
  // OpenStreetMap public embed, which needs no key/token and always works,
  // with the pin already centred on the office (the "Открыть в 2ГИС" button
  // above covers the 2ГИС link either way).
  //
  // NB: a Google Maps no-key iframe ("maps.google.com/maps?q=...&output=embed")
  // was tried here and reverted — Google now serves that embed page with
  // `X-Frame-Options: SAMEORIGIN`, so browsers refuse to render it inside an
  // iframe on a different origin (our site). The officially supported
  // replacement (Maps Embed API) needs a Google Cloud API key, same
  // constraint as the 2GIS integration above.
  const mapTargetEl = useDgis ? mapContainerEl.value : mapFrameEl.value
  if (mapTargetEl && 'IntersectionObserver' in window) {
    const osmSrc = 'https://www.openstreetmap.org/export/embed.html?bbox=38.9664533%2C45.0443012%2C38.9924533%2C45.0703012&layer=mapnik&marker=45.0573012%2C38.9794533'
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (useDgis) {
            initDgisMap()
          } else {
            mapFrameEl.value.src = osmSrc
          }
          observer.disconnect()
        }
      })
    }, { rootMargin: '200px' })
    observer.observe(mapTargetEl)
  }
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
  if (dgisMap && typeof dgisMap.destroy === 'function') dgisMap.destroy()
})
</script>
