<script setup lang="ts">
// The avatar of an author: the image, else the initials in a circle.
const props = defineProps<{
  author: { label?: string; name?: string; avatar?: PlutoPublicMedia | null };
  // The size in pixels. The image loads at two times this size.
  size?: number;
}>();

const px = computed(() => props.size ?? 32);
const name = computed(() => props.author.label ?? props.author.name ?? "");
const initials = computed(() =>
  name.value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join(""),
);
</script>

<template>
  <PlutoImage
    v-if="author.avatar"
    :media="author.avatar"
    :width="px"
    :height="px"
    :sizes="`${px * 2}px`"
    :alt="name"
    class="shrink-0 rounded-full object-cover"
    :style="{ width: `${px}px`, height: `${px}px` }"
  />
  <span
    v-else
    class="inline-flex shrink-0 items-center justify-center rounded-full bg-line font-medium text-heading"
    :style="{
      width: `${px}px`,
      height: `${px}px`,
      fontSize: `${Math.round(px * 0.4)}px`,
    }"
    aria-hidden="true"
  >
    {{ initials }}
  </span>
</template>
