<script setup lang="ts">
// The list of posts with a search box and pages, for the home page and the term pages. The default
// slot is the heading above the search box. `filter` narrows the list, for example
// `{ tags: 'hiking' }`.
const props = defineProps<{
  filter?: Record<string, string>;
  emptyText?: string;
}>();

// The search box writes `?q=` of the URL, and the page comes from `?page=`.
const { posts, search, page, pages, pageLink, error } = await usePosts({
  limit: 10,
  filter: () => props.filter,
});
</script>

<template>
  <div class="mx-auto max-w-2xl px-6 pb-16">
    <section class="pt-6 pb-10">
      <slot />

      <label class="relative mt-8 block">
        <span class="sr-only">Search posts</span>
        <Icon
          name="lucide:search"
          class="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
        />
        <input
          v-model="search"
          type="search"
          placeholder="Search posts"
          class="w-full rounded-lg border border-line bg-transparent py-2 ps-9 pe-3 text-sm outline-none placeholder:text-muted focus:border-muted"
        />
      </label>
    </section>

    <p v-if="error" class="text-red-600 dark:text-red-400">
      Could not load the posts: {{ error.statusText || error.message }}
    </p>

    <p v-else-if="!posts.length && search.trim()">
      No posts match “{{ search.trim() }}”.
      <button
        type="button"
        class="underline underline-offset-4"
        @click="search = ''"
      >
        Clear the search
      </button>
    </p>

    <p v-else-if="!posts.length && emptyText">{{ emptyText }}</p>

    <p v-else-if="!posts.length">
      No posts yet.
      <NuxtLink to="/admin" class="underline underline-offset-4">
        Open the admin
      </NuxtLink>
      and write the first one.
    </p>

    <template v-else>
      <ul class="divide-y divide-line border-y border-line">
        <li v-for="post in posts" :key="post.id">
          <PostListItem :post="post" />
        </li>
      </ul>

      <nav
        v-if="pages > 1"
        aria-label="Pages"
        class="mt-8 flex items-center justify-between text-sm"
      >
        <NuxtLink
          v-if="page > 1"
          :to="pageLink(page - 1)"
          class="inline-flex items-center gap-1.5 hover:text-heading"
        >
          <Icon name="lucide:arrow-left" class="size-4" />
          Newer posts
        </NuxtLink>
        <span v-else />

        <span class="text-muted">Page {{ page }} of {{ pages }}</span>

        <NuxtLink
          v-if="page < pages"
          :to="pageLink(page + 1)"
          class="inline-flex items-center gap-1.5 hover:text-heading"
        >
          Older posts
          <Icon name="lucide:arrow-right" class="size-4" />
        </NuxtLink>
        <span v-else />
      </nav>
    </template>
  </div>
</template>
