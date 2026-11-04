<script setup lang="ts">
// The preview of the post editor. `item` has the shape of the public API, so it
// renders with the component of the post page.
defineProps<{
  contentType: string;
  item: PlutoPreviewItem<PlutoPost>;
}>();
</script>

<template>
  <PostArticle :post="item" />
</template>
