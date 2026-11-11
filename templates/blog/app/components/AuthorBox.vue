<script setup lang="ts">
interface Props {
  /** The authors of the post: one box for each. */
  authors?: PlutoPostAuthor[];
}

const props = defineProps<Props>();
</script>

<template>
  <section v-if="props.authors?.length" class="flex flex-col gap-4">
    <h2 class="sr-only">About the authors</h2>
    <div
      v-for="author in props.authors"
      :key="author.id"
      class="flex items-start gap-4 rounded-xl bg-surface p-5"
    >
      <AuthorAvatar :author="author" :size="56" />
      <div class="min-w-0">
        <p class="font-semibold text-heading">{{ author.label }}</p>
        <p v-if="author.bio" class="mt-1 text-sm text-pretty text-muted">
          {{ author.bio }}
        </p>
        <NuxtLink
          v-if="author.slug"
          :to="`/authors/${author.slug}`"
          class="mt-2 inline-flex items-center gap-1 text-sm font-medium text-heading hover:underline hover:underline-offset-4"
        >
          More posts by {{ author.label }}
          <Icon name="lucide:arrow-right" class="size-3.5" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
