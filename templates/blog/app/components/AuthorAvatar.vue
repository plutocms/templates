<script setup lang="ts">
interface Props {
  author: {
    label?: string;
    name?: string;
    avatar?: PlutoPublicMedia | null;
  };

  size?: number;
}

const props = withDefaults(defineProps<Props>(), { size: 32 });

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
    v-if="props.author.avatar"
    :alt="name"
    :media="props.author.avatar"
    :width="props.size"
    :height="props.size"
    :sizes="`${props.size * 2}px`"
    :style="{
      width: `${props.size}px`,
      height: `${props.size}px`,
    }"
    class="shrink-0 rounded-full object-cover"
  />

  <span
    v-else
    :style="{
      width: `${props.size}px`,
      height: `${props.size}px`,
      fontSize: `${Math.round(props.size * 0.4)}px`,
    }"
    class="inline-flex shrink-0 items-center justify-center rounded-full bg-line font-medium text-heading"
    aria-hidden="true"
  >
    {{ initials }}
  </span>
</template>
