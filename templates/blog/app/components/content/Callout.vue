<script setup lang="ts">
interface Props {
  type?: "note" | "tip" | "warning";
  title?: string;
  text?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "note",
  title: "",
  text: "",
});

const tones = {
  note: {
    icon: "lucide:info",
    box: "border-sky-200 bg-sky-50/70 dark:border-sky-900/70 dark:bg-sky-950/40",
    accent: "text-sky-600 dark:text-sky-400",
    heading: "text-sky-900 dark:text-sky-200",
  },
  tip: {
    icon: "lucide:lightbulb",
    box: "border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/70 dark:bg-emerald-950/40",
    accent: "text-emerald-600 dark:text-emerald-400",
    heading: "text-emerald-900 dark:text-emerald-200",
  },
  warning: {
    icon: "lucide:triangle-alert",
    box: "border-amber-200 bg-amber-50/70 dark:border-amber-900/70 dark:bg-amber-950/40",
    accent: "text-amber-600 dark:text-amber-400",
    heading: "text-amber-900 dark:text-amber-200",
  },
};

const tone = computed(() => tones[props.type] ?? tones.note);

definePlutoBlock({
  label: "Callout",
  icon: "lucide:message-square-quote",
  description: "A note, a tip or a warning in a box.",
});
</script>

<template>
  <aside
    :class="tone.box"
    class="flex gap-3 rounded-xl border px-4 py-3.5 text-[0.9375rem] leading-relaxed"
  >
    <Icon
      :name="tone.icon"
      :class="tone.accent"
      class="mt-[0.2em] size-[1.15em] shrink-0"
    />

    <div class="min-w-0">
      <p v-if="props.title" :class="tone.heading" class="font-semibold">
        {{ props.title }}
      </p>

      <p v-if="props.text" :class="props.title && 'mt-0.5'">
        {{ props.text }}
      </p>
    </div>
  </aside>
</template>
