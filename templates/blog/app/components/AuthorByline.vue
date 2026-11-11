<script setup lang="ts">
interface Props {
  /** The authors of the post, in byline order. */
  authors?: PlutoPostAuthor[];
}

const props = defineProps<Props>();
</script>

<template>
  <div v-if="props.authors?.length" class="flex items-center gap-3">
    <div class="flex -space-x-1">
      <AuthorAvatar
        v-for="author in props.authors"
        :key="author.id"
        :author="author"
        :size="32"
        class="ring-2 ring-page"
      />
    </div>
    <p class="text-sm text-muted">
      By
      <template v-for="(author, index) in props.authors" :key="author.id">
        <span v-if="index && index === props.authors.length - 1"> and </span>
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
