<script setup lang="ts">
const siteName = useRuntimeConfig().public.websiteName;
const { t } = usePlutoSiteI18n();

useHead({
  titleTemplate: (title) =>
    title && title !== siteName ? `${title} - ${siteName}` : siteName,
});

// PlutoRoot moves the page down under the admin bar while it shows. The
// layout is then one screen less the bar, so a short page does not scroll.
const { visible: offset } = usePlutoAdminBar();
</script>

<template>
  <div
    :class="
      offset ? 'min-h-[calc(100dvh-var(--pluto-admin-bar-height))]' : 'min-h-dvh'
    "
    class="bg-default text-default flex flex-col"
  >
    <header
      class="pluto-site-header border-default bg-default/75 sticky top-0 z-40 border-b backdrop-blur"
    >
      <UContainer class="flex h-16 items-center justify-between gap-4">
        <NuxtLink to="/" class="flex min-w-0 items-center gap-2.5">
          <PlutoLogo mark class="size-7 shrink-0" />
          <span
            class="font-display text-highlighted truncate text-xl font-semibold"
          >
            {{ siteName }}
          </span>
        </NuxtLink>

        <div class="flex items-center gap-1">
          <LanguageSwitch />
          <UColorModeButton color="neutral" variant="ghost" />
        </div>
      </UContainer>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-default border-t">
      <UContainer
        class="text-muted flex flex-col items-center justify-between gap-3 py-8 text-sm sm:flex-row"
      >
        <p>© {{ new Date().getFullYear() }} {{ siteName }}</p>

        <ULink
          to="https://pluto.vulmix.dev"
          target="_blank"
          class="hover:text-highlighted flex items-center gap-2"
        >
          <PlutoLogo mark class="size-4" />
          {{ t("site.footer.builtWith") }}
        </ULink>
      </UContainer>
    </footer>
  </div>
</template>
