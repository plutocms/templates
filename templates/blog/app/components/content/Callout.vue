<script setup lang="ts">
interface Props {
  /** The kind of callout. */
  type?: "note" | "tip" | "warning";
  /** The first line, in bold. */
  title?: string;
  /** The text of the callout. */
  text?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "note",
  title: "",
  text: "",
});

definePlutoBlock({
  label: "Callout",
  icon: "i-lucide-message-square-quote",
  description: "A note, a tip or a warning in a box.",
});
</script>

<template>
  <aside
    :class="{
      'border-line bg-surface': props.type === 'note',
      'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950':
        props.type === 'tip',
      'border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950':
        props.type === 'warning',
    }"
    class="rounded-lg border-s-4 px-5 py-4"
  >
    <p v-if="props.title" class="font-semibold text-heading">
      {{ props.title }}
    </p>
    <p v-if="props.text" :class="props.title && 'mt-1'">{{ props.text }}</p>
  </aside>
</template>
