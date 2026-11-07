<script setup lang="ts">
const props = defineProps<{ post: PlutoPostSummary }>();

const date = computed(() => formatPublishedDate(props.post));
// The item is one link, so the category is text here. Its page is linked on the post.
const category = computed(() => props.post.categories?.[0]?.label);
// The names of the authors, as text: "Ana and Bo".
const authors = computed(() => {
  const names = (props.post.authors ?? []).map((author) => author.label);
  return names.length > 1
    ? `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`
    : names[0];
});
</script>

<template>
  <NuxtLink
    :to="`/posts/${post.slug}`"
    class="group flex items-start gap-5 py-6"
  >
    <div class="min-w-0 flex-1">
      <p class="text-sm text-muted">
        <time v-if="date">{{ date }}</time>
        <span v-if="date && category" aria-hidden="true"> · </span>
        <span v-if="category">{{ category }}</span>
        <span v-if="(date || category) && authors" aria-hidden="true"> · </span>
        <span v-if="authors">{{ authors }}</span>
      </p>
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
