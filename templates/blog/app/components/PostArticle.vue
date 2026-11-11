<script setup lang="ts">
interface Props {
  /** The post to show. */
  post: PlutoPost;
  /** Mark the post as a draft (an editor sees drafts). */
  draft?: boolean;
}

const props = defineProps<Props>();

const date = computed(() =>
  formatPublishedDate(props.post, { dateStyle: "long" }),
);
</script>

<template>
  <article class="mx-auto max-w-2xl px-6 pt-6 pb-16">
    <NuxtLink
      to="/"
      class="inline-flex items-center gap-1.5 text-sm text-muted hover:text-heading"
    >
      <Icon name="lucide:arrow-left" class="size-4" />
      All posts
    </NuxtLink>

    <header class="mt-8">
      <p v-if="props.post.categories?.length" class="mb-2 text-sm font-medium">
        <template
          v-for="(category, index) in props.post.categories"
          :key="category.id"
        >
          <span v-if="index" class="text-muted" aria-hidden="true"> · </span>
          <NuxtLink
            v-if="category.slug"
            :to="`/categories/${category.slug}`"
            class="text-heading hover:underline hover:underline-offset-4"
          >
            {{ category.label }}
          </NuxtLink>
          <span v-else class="text-heading">{{ category.label }}</span>
        </template>
      </p>

      <p class="text-sm text-muted">
        <time v-if="date">{{ date }}</time>
        <span v-if="date" aria-hidden="true"> · </span>
        <span>{{ readingMinutes(props.post.html) }} min read</span>
        <span
          v-if="props.draft"
          class="ms-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-950 dark:text-amber-300"
        >
          Draft
        </span>
      </p>

      <h1
        class="mt-2 text-3xl font-semibold tracking-tight text-balance text-heading sm:text-4xl"
      >
        {{ props.post.title }}
      </h1>

      <p v-if="props.post.excerpt" class="mt-4 text-lg text-pretty text-muted">
        {{ props.post.excerpt }}
      </p>

      <AuthorByline :authors="props.post.authors" class="mt-6" />
    </header>

    <PlutoImage
      v-if="props.post.cover"
      :media="props.post.cover"
      sizes="xs:100vw md:672px"
      loading="eager"
      fetchpriority="high"
      class="mt-10 h-auto w-full rounded-xl"
    />

    <PlutoHtml
      :html="props.post.html"
      tag="div"
      class="mt-10"
      data-pluto-post-body
    />

    <TermChips :terms="props.post.tags" base="tags" class="mt-12" />

    <AuthorBox :authors="props.post.authors" class="mt-12" />
  </article>
</template>
