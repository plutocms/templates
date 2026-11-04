# Pluto templates

The official templates of [Pluto](https://pluto.vulmix.dev). Each folder in `templates/` is a
project you can start from. A new project gets that folder only: the files at the root of this
repository are for the development of the templates.

## The templates

### Blog (minimalist)

Posts, search and a light and dark mode. Tailwind CSS and a few components, no UI library. Git CMS
or Supabase. [`templates/blog`](templates/blog)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fplutocms%2Ftemplates%2Ftree%2Fmain%2Ftemplates%2Fblog&project-name=my-blog&repository-name=my-blog)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/plutocms/templates&create_from_path=templates/blog)

### Shop (Supabase)

A product catalog: photos, categories, stock, search and two languages, on Nuxt UI. Supabase.
[`templates/supabase-shop`](templates/supabase-shop)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fplutocms%2Ftemplates%2Ftree%2Fmain%2Ftemplates%2Fsupabase-shop&project-name=my-shop&repository-name=my-shop&env=SUPABASE_URL,SUPABASE_KEY,DATABASE_URL&envDescription=The%20values%20of%20your%20Supabase%20project&envLink=https%3A%2F%2Fpluto.vulmix.dev%2Fdocs%2Fsupabase)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/plutocms/templates&create_from_path=templates/supabase-shop)

### Dashboard only

No public site: the Pluto admin and the public API, for a site in any stack. Git CMS or Supabase,
with the layers you pick. [`templates/dashboard`](templates/dashboard)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fplutocms%2Ftemplates%2Ftree%2Fmain%2Ftemplates%2Fdashboard&project-name=my-cms&repository-name=my-cms)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/plutocms/templates&create_from_path=templates/dashboard)

A button copies the template to a new repository in your GitHub account and deploys it. With the
Git CMS, open `/admin/login` on the new site and select **Create the GitHub App**. With Supabase,
the host asks for the values of your Supabase project.

## Start with the CLI

```bash
npm create pluto@latest
npm create pluto@latest my-blog -t blog --backend git
npm create pluto@latest my-app -t none --backend git
```

`-t none` starts from scratch: a Nuxt app that extends Pluto, with no pages of its own.

## Develop the templates

- `templates/<id>/` is the project, exactly what a user gets. Put nothing in it that a user does
  not need.
- `templates.json` is the registry: the name, the description, the backends and the changes the
  CLI makes for each backend. `create-pluto` and the store on the Pluto site read it.
  `bun run test` checks it against the folders.
- The root is a Bun workspace over `templates/*`. `bun install` installs every template, and
  `bun run build` builds them all.
- A new template: a new folder (its id, for example `charon`), a `package.json` named
  `pluto-template-<id>`, and an entry in `templates.json`.

## License

MIT
