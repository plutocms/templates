<script setup lang="ts">
interface Props {
  /** The post, as the list returns it. */
  post: PlutoPostSummary;
}

const props = defineProps<Props>();

const date = computed(() => formatPublishedDate(props.post));
const category = computed(() => props.post.categories?.[0]?.label);
const authors = computed(() => {
  const names = (props.post.authors ?? []).map((author) => author.label);
  return names.length > 1
    ? `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`
    : names[0];
});
</script>

<template>
  <NuxtLink
    :to="`/posts/${props.post.slug}`"
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
        {{ props.post.title }}
      </h2>
      <p v-if="props.post.excerpt" class="mt-1.5 line-clamp-2 text-pretty">
        {{ props.post.excerpt }}
      </p>
    </div>

    <PlutoImage
      v-if="props.post.cover"
      :media="props.post.cover"
      sizes="96px"
      class="hidden size-24 shrink-0 rounded-lg object-cover sm:block"
    />
  </NuxtLink>
</template>
