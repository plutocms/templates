<script setup lang="ts">
const props = defineProps<{ product: PublicProduct }>();

const { t } = usePlutoSiteI18n();

const image = computed(() => productImages(props.product)[0]);
</script>

<template>
  <NuxtLink
    :to="`/product/${product.slug}`"
    class="group bg-default ring-default hover:ring-primary/50 flex flex-col overflow-hidden rounded-xl ring transition-shadow hover:shadow-lg"
  >
    <div class="bg-elevated relative aspect-square overflow-hidden">
      <PlutoImage
        v-if="image"
        :media="image"
        :alt="image.alt || product.name"
        sizes="xs:50vw lg:300px"
        class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <UIcon
        v-else
        name="i-lucide-image"
        class="text-dimmed absolute inset-0 m-auto size-10"
      />

      <UBadge
        v-if="product.is_custom"
        :label="t('site.product.madeToOrder')"
        color="secondary"
        variant="solid"
        class="absolute top-3 left-3"
      />
      <UBadge
        v-else-if="isSoldOut(product)"
        :label="t('site.product.soldOut')"
        color="neutral"
        variant="solid"
        class="absolute top-3 left-3"
      />
    </div>

    <div class="flex flex-1 flex-col gap-1 p-4">
      <p v-if="product.category" class="text-muted text-sm">
        {{ product.category.label }}
      </p>

      <h2
        class="font-display text-highlighted group-hover:text-primary text-lg font-semibold text-balance transition-colors"
      >
        {{ product.name }}
      </h2>

      <p class="text-highlighted mt-auto pt-2 font-semibold">
        {{ formatProductPrice(product.price) }}
      </p>
    </div>
  </NuxtLink>
</template>
