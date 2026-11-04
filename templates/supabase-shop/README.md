# Shop (Supabase)

A product catalog on [Pluto](https://pluto.vulmix.dev) and Supabase. The admin manages the
products, their photos, the categories and the stock. The template extends
[`@plutocms/supabase-shop`](https://github.com/plutocms/supabase-shop), which brings
`@plutocms/supabase` and `@plutocms/core`.

## Create a shop

```bash
npm create pluto@latest my-shop -t supabase-shop
```

The CLI writes the `.env` with your Supabase project.

## Run it

```bash
npm run dev
```

Then open `/admin` on the dev server. The first visit opens the setup wizard of the Supabase
layer. `npm run supabase-types` writes the database types.

## Make it yours

The site is small on purpose. Every file is a starting point:

| File                             | What it does                                                                                                                                                   |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/app.config.ts`              | The colors (`primary`, `secondary`, `neutral`). Pluto's palette is the default.                                                                                |
| `app/assets/css/tailwind.css`    | The CSS entry. `@plutocms/css/site` adds the Pluto look: the fonts, the dark mode and the `pluto-sky` background. Remove that line for a theme of your own. |
| `app/layouts/default.vue`        | The header (your logo and the site name) and the footer.                                                                                                       |
| `app/pages/index.vue`            | The store: the products, with search, categories and pages.                                                                                                    |
| `app/pages/product/[slug].vue`   | One product: the photos, the price, the stock and the description.                                                                                             |
| `app/components/ProductCard.vue` | A product in the grid.                                                                                                                                         |
| `i18n/locales/*.json`            | The texts of the site (`site.*`), one file per language.                                                                                                       |

The site name comes from `websiteName` in `nuxt.config.ts` (or `NUXT_PUBLIC_WEBSITE_NAME`).

Prices are stored in cents. `formatProductPrice(cents)` shows them in BRL. For another currency,
pass it: `formatProductPrice(cents, { currency: 'USD' })`.

The template has no cart and no checkout. Add them in your app, for example with a payment
provider's hosted checkout on the product page.

### Languages

The site has its own language, separate from the admin language. The language switch in the
header shows when there is more than one file in `i18n/locales/`. Use `usePlutoSiteI18n()` in a
page: `t('site.…')` for text and `d(date, options)` for dates. `plutoI18n.siteLocale` in
`nuxt.config.ts` sets the language before a visitor picks one.

## Team and email (optional)

Admins invite the team under Settings > Users. It works with no setup: Supabase sends the
emails. Supabase's built-in mailer sends only to members of your Supabase organization, and only
a few emails per hour. To invite anyone, open Settings > Email in the admin and follow the steps.
They use Resend, which has a free plan.

These optional variables go in the environment of the running server, never in the build
environment:

```bash
# The Supabase secret key. Invites then use Supabase's invite API, and
# "Copy invite link" is available.
NUXT_SUPABASE_SECRET_KEY=

# Pluto mail with Resend (Settings > Email shows the exact lines).
NUXT_PLUTO_MAIL_RESEND_API_KEY=
NUXT_PLUTO_MAIL_FROM="Your Shop <hello@your-domain.com>"
```

## Go live

Push the project to a GitHub repository and deploy it (for example to Vercel). Set the values of
your `.env` (`SUPABASE_URL`, `SUPABASE_KEY`, `DATABASE_URL`) in the settings of your host.

**Docs:** [Supabase](https://pluto.vulmix.dev/docs/supabase) ·
[Shop layer](https://pluto.vulmix.dev/docs/layers/shop)

## License

MIT
