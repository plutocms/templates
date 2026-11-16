<script setup lang="ts">
const { name: siteName } = usePlutoSite();

const { items } = await usePlutoMenu("main");
</script>

<template>
  <header
    class="mx-auto flex w-full max-w-2xl items-center justify-between gap-4 px-6 pt-10 pb-6"
  >
    <NuxtLink
      to="/"
      class="inline-flex min-w-0 items-center gap-2.5 font-semibold text-heading"
    >
      <PlutoLogo mark class="size-6 shrink-0" aria-hidden="true" />

      <span class="truncate">{{ siteName }}</span>
    </NuxtLink>

    <nav class="flex items-center gap-4">
      <template v-if="items.length">
        <template v-for="item in items" :key="item.label">
          <details v-if="item.children.length" class="relative">
            <summary
              class="cursor-pointer list-none text-sm text-muted hover:text-heading"
            >
              {{ item.label }}
            </summary>

            <div
              class="absolute right-0 z-10 mt-2 flex min-w-40 flex-col gap-1 rounded-md border border-default bg-surface p-2 shadow-sm"
            >
              <NuxtLink
                v-if="item.to"
                :to="item.to"
                :target="item.target"
                class="rounded px-2 py-1 text-sm text-muted hover:text-heading"
              >
                {{ item.label }}
              </NuxtLink>

              <NuxtLink
                v-for="child in item.children"
                :key="child.label"
                :to="child.to"
                :target="child.target"
                class="rounded px-2 py-1 text-sm text-muted hover:text-heading"
              >
                {{ child.label }}
              </NuxtLink>
            </div>
          </details>

          <NuxtLink
            v-else
            :to="item.to"
            :target="item.target"
            class="text-sm text-muted hover:text-heading"
          >
            {{ item.label }}
          </NuxtLink>
        </template>
      </template>

      <NuxtLink
        v-else
        to="/about"
        class="text-sm text-muted hover:text-heading"
      >
        About
      </NuxtLink>

      <ColorModeButton
        class="inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-muted hover:bg-surface hover:text-heading"
      />
    </nav>
  </header>
</template>
