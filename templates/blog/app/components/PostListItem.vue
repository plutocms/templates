<script setup lang="ts">
const props = defineProps<{ post: PlutoPostSummary }>();

const date = computed(() => formatPublishedDate(props.post));
</script>

<template>
  <NuxtLink
    :to="`/posts/${post.slug}`"
    class="group flex items-start gap-5 py-6"
  >
    <div class="min-w-0 flex-1">
      <time v-if="date" class="text-sm text-muted">{{ date }}</time>
      <h2
        class="mt-1 text-lg font-semibold text-balance text-heading group-hover:underline group-hover:underline-offset-4"
      >
        {{ post.title }}
      </h2>
      <p v-if="post.excerpt" class="mt-1.5 line-clamp-2 text-pretty">
        {{ post.excerpt }}
      </p>
    </div>

    <PlutoImage
      v-if="post.cover"
      :media="post.cover"
      sizes="96px"
      class="hidden size-24 shrink-0 rounded-lg object-cover sm:block"
    />
  </NuxtLink>
</template>
