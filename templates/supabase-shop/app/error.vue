<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();

const { t } = usePlutoSiteI18n();
const notFound = computed(() => props.error.statusCode === 404);

useSeoMeta({
  title: () =>
    notFound.value ? t("site.error.notFound") : t("site.error.generic"),
  robots: "noindex",
});
</script>

<template>
  <PlutoRoot>
    <section class="pluto-sky">
      <UContainer
        class="flex flex-col items-center gap-5 py-24 text-center sm:py-32"
      >
        <p class="font-display text-primary text-7xl font-semibold">
          {{ error.statusCode }}
        </p>
        <h1 class="text-highlighted text-3xl font-semibold sm:text-4xl">
          {{ notFound ? t("site.error.notFound") : t("site.error.generic") }}
        </h1>
        <p v-if="notFound" class="text-muted max-w-md text-pretty">
          {{ t("site.error.notFoundHint") }}
        </p>
        <UButton
          :label="t('site.error.home')"
          icon="i-lucide-house"
          class="mt-2"
          @click="clearError({ redirect: '/' })"
        />
      </UContainer>
    </section>
  </PlutoRoot>
</template>
