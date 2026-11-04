<script setup lang="ts">
const siteName = useRuntimeConfig().public.websiteName;
const { t } = usePlutoSiteI18n();
const route = useRoute();
const router = useRouter();

useSeoMeta({ title: siteName, description: () => t("site.home.tagline") });

const PAGE_SIZE = 12;

const q = computed(() => String(route.query.q ?? "").trim());
const categorySlug = computed(() => String(route.query.category ?? ""));
const page = computed({
  get: () => Math.max(1, Number(route.query.page) || 1),
  set: (value: number) =>
    router.replace({
      query: { ...route.query, page: value > 1 ? String(value) : undefined },
    }),
});

const search = ref(q.value);
watchDebounced(
  search,
  (value) =>
    router.replace({
      query: { ...route.query, q: value.trim() || undefined, page: undefined },
    }),
  { debounce: 300 },
);

function categoryLink(slug?: string) {
  return { query: { ...route.query, category: slug, page: undefined } };
}

function clearFilters() {
  search.value = "";
  router.replace({ query: {} });
}

const { data: categoryList } = await usePlutoPublicList<PublicProductTaxonomy>(
  "product-category",
  { limit: 100, sort: "label" },
);
const categories = computed(() => categoryList.value?.data ?? []);
const category = computed(() =>
  categories.value.find((entry) => entry.slug === categorySlug.value),
);

const { data, error } = await usePlutoPublicList<PublicProduct>(
  "product",
  () => ({
    limit: PAGE_SIZE,
    offset: (page.value - 1) * PAGE_SIZE,
    sort: "-createdAt",
    ...(q.value ? { search: q.value } : {}),
    ...(category.value ? { filter: { category: category.value.id } } : {}),
  }),
);

const products = computed(() => data.value?.data ?? []);
const total = computed(() => data.value?.meta.total ?? 0);
const filtered = computed(() => Boolean(q.value || category.value));
</script>

<template>
  <div>
    <section class="pluto-sky border-default border-b">
      <UContainer class="flex flex-col items-start gap-5 py-16 sm:py-24">
        <span
          class="bg-primary/10 text-primary ring-primary/25 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ring"
        >
          <UIcon name="i-lucide-shopping-bag" class="size-4" />
          {{ t("site.home.chip") }}
        </span>

        <h1
          class="text-highlighted text-5xl font-semibold tracking-tight text-balance sm:text-6xl"
        >
          {{ siteName }}
        </h1>

        <p class="text-muted max-w-xl text-lg text-pretty sm:text-xl">
          {{ t("site.home.tagline") }}
        </p>

        <UInput
          v-model="search"
          :placeholder="t('site.home.search')"
          :aria-label="t('site.home.search')"
          icon="i-lucide-search"
          size="lg"
          class="mt-2 w-full max-w-md"
        />
      </UContainer>
    </section>

    <UContainer class="py-12 sm:py-16">
      <nav
        v-if="categories.length"
        :aria-label="t('site.home.categories')"
        class="mb-8 flex flex-wrap gap-2"
      >
        <UButton
          :label="t('site.home.all')"
          :to="categoryLink()"
          :variant="category ? 'outline' : 'solid'"
          color="neutral"
          size="sm"
          class="rounded-full"
        />
        <UButton
          v-for="entry in categories"
          :key="entry.id"
          :label="entry.label"
          :to="categoryLink(entry.slug)"
          :variant="entry.id === category?.id ? 'solid' : 'outline'"
          color="neutral"
          size="sm"
          class="rounded-full"
        />
      </nav>

      <UAlert
        v-if="error"
        :title="t('site.home.loadFailed')"
        :description="error.statusMessage || error.message"
        color="error"
        variant="subtle"
        icon="i-lucide-circle-alert"
      />

      <UEmpty
        v-else-if="!products.length && filtered"
        :title="t('site.home.noResults')"
        :actions="[
          {
            label: t('site.home.clearFilters'),
            color: 'neutral',
            variant: 'outline',
            onClick: clearFilters,
          },
        ]"
        icon="i-lucide-search-x"
        variant="naked"
      />

      <UEmpty
        v-else-if="!products.length"
        :title="t('site.home.empty')"
        :description="t('site.home.emptyHint')"
        :actions="[
          {
            label: t('site.home.openAdmin'),
            to: '/admin',
            icon: 'i-lucide-package-plus',
          },
        ]"
        icon="i-lucide-shopping-bag"
        variant="naked"
      />

      <template v-else>
        <div class="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </div>

        <UPagination
          v-if="total > PAGE_SIZE"
          v-model:page="page"
          :total="total"
          :items-per-page="PAGE_SIZE"
          class="mt-12 flex justify-center"
        />
      </template>
    </UContainer>
  </div>
</template>
