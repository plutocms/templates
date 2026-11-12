<script setup lang="ts">
interface Props {
  contentType: string;
  item: PlutoPreviewItem<PlutoPost>;
}

const props = defineProps<Props>();
</script>

<template>
  <PostArticle :post="props.item" />
</template>
