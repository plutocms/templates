<script setup lang="ts">
import type { NuxtError } from "#app";

interface Props {
  error: NuxtError;
}

const props = defineProps<Props>();

const notFound = computed(() => props.error.status === 404);

const title = computed(() =>
  notFound.value ? "Page not found" : "Something went wrong",
);

useSeoMeta({ title, robots: "noindex" });
</script>

<template>
  <PlutoRoot>
    <section class="mx-auto max-w-2xl px-6 pt-6 pb-16">
      <p class="text-sm text-muted">{{ props.error.status }}</p>

      <h1 class="mt-2 text-3xl font-semibold tracking-tight text-heading">
        {{ title }}
      </h1>

      <p v-if="notFound" class="mt-3">
        The page you are looking for does not exist, or it moved.
      </p>

      <button
        type="button"
        class="mt-8 inline-flex items-center gap-1.5 text-sm underline underline-offset-4"
        @click="clearError({ redirect: '/' })"
      >
        <Icon name="lucide:arrow-left" class="size-4" />

        Go to the home page
      </button>
    </section>
  </PlutoRoot>
</template>
