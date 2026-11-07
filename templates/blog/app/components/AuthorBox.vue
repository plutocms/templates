<script setup lang="ts">
// The authors after a post: one box for each, with the avatar, the name, the bio and a link to the
// other posts of the author.
defineProps<{ authors?: PlutoPostAuthor[] }>();
</script>

<template>
  <section v-if="authors?.length" class="flex flex-col gap-4">
    <h2 class="sr-only">About the authors</h2>
    <div
      v-for="author in authors"
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
