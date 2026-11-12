<script setup lang="ts">
const { tags } = await useTags({
  limit: 100,
  search: false,
  page: false,
});

const terms = computed<PlutoPublicReference[]>(() =>
  tags.value.map((tag) => ({
    id: tag.id,
    label: tag.title,
    slug: tag.slug,
  })),
);

useHead({ title: "Tags" });
</script>

<template>
  <div class="mx-auto max-w-2xl px-6 pb-16">
    <section class="pt-6 pb-10">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-1.5 text-sm text-muted hover:text-heading"
      >
        <Icon name="lucide:arrow-left" class="size-4" />

        All posts
      </NuxtLink>

      <h1
        class="mt-8 text-3xl font-semibold tracking-tight text-heading sm:text-4xl"
      >
        Tags
      </h1>
    </section>

    <TermChips v-if="terms.length" :terms="terms" base="tags" />

    <p v-else>No tags yet.</p>
  </div>
</template>
