<script setup lang="ts">
// The byline of a post: the avatars, stacked, and "By A, B and C", each name a link to the page of
// the author.
defineProps<{ authors?: PlutoPostAuthor[] }>();
</script>

<template>
  <div v-if="authors?.length" class="flex items-center gap-3">
    <div class="flex -space-x-1">
      <AuthorAvatar
        v-for="author in authors"
        :key="author.id"
        :author="author"
        :size="32"
        class="ring-2 ring-page"
      />
    </div>
    <p class="text-sm text-muted">
      By
      <template v-for="(author, index) in authors" :key="author.id">
        <span v-if="index && index === authors.length - 1"> and </span>
        <span v-else-if="index">, </span>
        <NuxtLink
          v-if="author.slug"
          :to="`/authors/${author.slug}`"
          class="font-medium text-heading hover:underline hover:underline-offset-4"
        >
          {{ author.label }}
        </NuxtLink>
        <span v-else class="font-medium text-heading">{{ author.label }}</span>
      </template>
    </p>
  </div>
</template>
