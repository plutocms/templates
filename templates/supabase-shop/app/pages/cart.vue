<script setup lang="ts">
const { t } = usePlutoSiteI18n();

useSeoMeta({ title: () => t("site.cart.title"), robots: "noindex" });

const { lines, count, subtotal, ready, setQuantity, remove, clear, refresh } =
  useCart<PublicProduct>();

// The cart reads its products again after each page load. Here the page also shows what
// changed: a product that is gone or sold out, a new price or less stock. On the first page of a
// visit the call is the one that the cart starts when it loads.
const notice = ref("");
watch(
  ready,
  async (loaded) => {
    if (!loaded) {
      return;
    }
    const result = await refresh().catch(() => null);
    if (result?.removed.length) {
      notice.value = t("site.cart.removed", result.removed.length);
    } else if (result?.changed.length) {
      notice.value = t("site.cart.changed");
    }
  },
  { immediate: true },
);

function image(product: PublicProduct) {
  return productImages(product)[0];
}
</script>

<template>
  <UContainer class="py-10 sm:py-16">
    <ULink
      to="/"
      class="text-muted hover:text-primary mb-8 inline-flex items-center gap-1.5 text-sm"
    >
      <UIcon name="i-lucide-arrow-left" class="size-4" />
      {{ t("site.product.back") }}
    </ULink>

    <h1
      class="text-highlighted mb-8 text-4xl font-semibold text-balance sm:text-5xl"
    >
      {{ t("site.cart.title") }}
    </h1>

    <UAlert
      v-if="notice"
      :title="notice"
      color="warning"
      variant="subtle"
      icon="i-lucide-info"
      class="mb-6"
    />

    <!-- The server has no cart: until the browser loads it, the page shows a placeholder. -->
    <div v-if="!ready" class="flex flex-col gap-4">
      <USkeleton v-for="index in 2" :key="index" class="h-24 rounded-xl" />
    </div>

    <UEmpty
      v-else-if="!lines.length"
      :title="t('site.cart.empty')"
      :description="t('site.cart.emptyHint')"
      :actions="[
        {
          label: t('site.product.back'),
          to: '/',
          color: 'neutral',
          variant: 'outline',
        },
      ]"
      icon="i-lucide-shopping-bag"
      variant="naked"
    />

    <div v-else class="grid items-start gap-8 lg:grid-cols-[1fr_20rem]">
      <ul class="divide-default ring-default divide-y rounded-xl ring">
        <li v-for="line in lines" :key="line.id" class="flex gap-4 p-4">
          <NuxtLink
            :to="`/product/${line.product.slug}`"
            class="bg-elevated relative size-20 shrink-0 overflow-hidden rounded-lg"
          >
            <PlutoImage
              v-if="image(line.product)"
              :media="image(line.product)!"
              :alt="image(line.product)!.alt || line.product.name"
              sizes="80px"
              class="size-full object-cover"
            />
            <UIcon
              v-else
              name="i-lucide-image"
              class="text-dimmed absolute inset-0 m-auto size-6"
            />
          </NuxtLink>

          <div
            class="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <div class="flex min-w-0 flex-1 flex-col gap-1">
              <NuxtLink
                :to="`/product/${line.product.slug}`"
                class="text-highlighted hover:text-primary font-semibold text-balance"
              >
                {{ line.product.name }}
              </NuxtLink>
              <p class="text-muted text-sm">
                {{ formatProductPrice(line.product.price) }}
              </p>
            </div>

            <div class="flex items-center gap-3">
              <UInputNumber
                :model-value="line.quantity"
                :min="1"
                :max="line.limit"
                :aria-label="
                  t('site.cart.quantity', { name: line.product.name })
                "
                class="w-28"
                @update:model-value="
                  (value) => setQuantity(line.id, value ?? 1)
                "
              />

              <p
                class="text-highlighted flex-1 text-right font-semibold whitespace-nowrap sm:w-28 sm:flex-none"
              >
                {{ formatProductPrice(line.subtotal) }}
              </p>

              <UButton
                :aria-label="t('site.cart.remove', { name: line.product.name })"
                icon="i-lucide-trash-2"
                color="neutral"
                variant="ghost"
                @click="remove(line.id)"
              />
            </div>
          </div>
        </li>
      </ul>

      <div
        class="bg-elevated/50 ring-default flex flex-col gap-4 rounded-xl p-6 ring"
      >
        <div class="flex items-baseline justify-between gap-4">
          <span class="text-muted">{{ t("site.cart.items", count) }}</span>
          <span class="text-highlighted text-2xl font-semibold">
            {{ formatProductPrice(subtotal) }}
          </span>
        </div>
        <p class="text-muted text-sm">{{ t("site.cart.subtotalHint") }}</p>
        <UButton
          :label="t('site.cart.clear')"
          icon="i-lucide-x"
          color="neutral"
          variant="outline"
          block
          @click="clear()"
        />
      </div>
    </div>
  </UContainer>
</template>
