<script setup lang="ts">
interface Props {
  /** The content type of the item. */
  contentType: string;
  /** The post in the editor, with the shape of the public API. */
  item: PlutoPreviewItem<PlutoPost>;
}

const props = defineProps<Props>();
</script>

<template>
  <PostArticle :post="props.item" />
</template>
