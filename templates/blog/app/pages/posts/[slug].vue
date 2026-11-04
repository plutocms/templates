<script setup lang="ts">
const route = useRoute();
const slug = () => String(route.params.slug);

// A missing post shows the 404 page. An editor also sees a draft, marked as one.
// `usePost` sets the SEO tags and the "Edit Post" button of the admin bar.
const { post, draft } = await usePost(slug);
const { newer, older } = await useAdjacentPosts(slug);
</script>

<template>
  <div v-if="post">
    <PostArticle :post="post" :draft="draft" />
    <PostNavigation :newer="newer" :older="older" />
  </div>
</template>
