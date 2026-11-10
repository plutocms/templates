<script setup lang="ts">
// A callout in a post: a note, a tip or a warning in a box. It is a content component: the post
// editor of the admin lists it under "Insert a component" (the puzzle icon), because the file calls
// `definePlutoBlock`. In the Markdown of a post it is:
//
//   ::callout{type="tip" title="A tip" text="The text of the tip."}
//   ::
//
// Add your own components next to this one: every file of `components/content/` that calls
// `definePlutoBlock` shows in the editor.
withDefaults(
  defineProps<{
    /** The kind of callout: a note, a tip or a warning. */
    type?: "note" | "tip" | "warning";
    /** The first line, in bold. */
    title?: string;
    /** The text of the callout. */
    text?: string;
  }>(),
  { type: "note", title: "", text: "" },
);

definePlutoBlock({
  label: "Callout",
  icon: "i-lucide-message-square-quote",
  description: "A note, a tip or a warning in a box.",
});
</script>

<template>
  <aside
    :class="{
      'border-line bg-surface': type === 'note',
      'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950':
        type === 'tip',
      'border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950':
        type === 'warning',
    }"
    class="rounded-lg border-s-4 px-5 py-4"
  >
    <p v-if="title" class="font-semibold text-heading">{{ title }}</p>
    <p v-if="text" :class="title && 'mt-1'">{{ text }}</p>
  </aside>
</template>
