<template>
  <nav class="ls-breadcrumbs" aria-label="Хлебные крошки">
    <ol class="ls-breadcrumbs__list">
      <li v-for="(item, index) in items" :key="item.path" class="ls-breadcrumbs__item">
        <NuxtLink v-if="index < items.length - 1" :to="item.path" class="ls-breadcrumbs__link">{{ item.name }}</NuxtLink>
        <span v-else class="ls-breadcrumbs__current" aria-current="page">{{ item.name }}</span>
        <span v-if="index < items.length - 1" class="ls-breadcrumbs__sep" aria-hidden="true">/</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.ls-breadcrumbs {
  margin: 0 0 12px;
}
.ls-breadcrumbs__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.9rem;
  color: var(--color-text-muted, #6b7280);
}
.ls-breadcrumbs__item {
  display: flex;
  align-items: center;
  gap: 6px;
}
.ls-breadcrumbs__link {
  color: inherit;
  text-decoration: none;
}
.ls-breadcrumbs__link:hover,
.ls-breadcrumbs__link:focus-visible {
  text-decoration: underline;
  color: var(--color-primary, #7176b7);
}
.ls-breadcrumbs__current {
  color: var(--color-text, #1f2333);
  font-weight: 600;
}
.ls-breadcrumbs__sep {
  opacity: 0.6;
}
</style>
