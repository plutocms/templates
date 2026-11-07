<script setup lang="ts">
const route = useRoute();
const slug = () => String(route.params.slug);

// A missing author shows the 404 page.
const { author } = await useAuthor(slug);
</script>

<template>
  <PostList
    v-if="author"
    :filter="{ authors: author.slug }"
    empty-text="No posts by this author yet."
  >
    <NuxtLink
      to="/"
      class="inline-flex items-center gap-1.5 text-sm text-muted hover:text-heading"
    >
      <Icon name="lucide:arrow-left" class="size-4" />
      All posts
    </NuxtLink>
    <div class="mt-8 flex items-center gap-5">
      <AuthorAvatar :author="author" :size="72" />
      <div class="min-w-0">
        <p class="text-sm text-muted">Author</p>
        <h1
          class="mt-1 text-3xl font-semibold tracking-tight text-heading sm:text-4xl"
        >
          {{ author.name }}
        </h1>
      </div>
    </div>
    <p v-if="author.bio" class="mt-4 text-lg text-pretty text-muted">
      {{ author.bio }}
    </p>
  </PostList>
</template>
