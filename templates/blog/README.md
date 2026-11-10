# Blog (minimalist)

A blog on [Pluto](https://pluto.vulmix.dev), with one of two backends:

- **Git CMS:** no database. Posts are Markdown files in this repository, and each save in the
  admin is a commit. The template extends [`@plutocms/core`](https://github.com/plutocms/pluto).
- **Supabase:** posts in your Supabase database, with image uploads. The template extends
  [`@plutocms/supabase-blog`](https://github.com/plutocms/supabase-blog).

The pages are the same for both backends.

## Create a blog

```bash
npm create pluto@latest my-blog -t blog --backend git
npm create pluto@latest my-blog -t blog --backend supabase
```

The CLI sets the backend: the layer in `nuxt.config.ts`, the packages, the sample posts in
`content/` (Git CMS only) and the `.env`.

## Run it

```bash
npm run dev
```

Then open `/admin` on the dev server.

- **Git CMS:** in development you are signed in as a local user, and the posts are the files
  in `content/posts`. It works out of the box with local Git: each save in the admin is a commit
  in the local repository of the project (run `git init` first if the project is not a Git
  repository yet). Push when you are ready. Local Git publishing works in development only. A
  deployed site publishes through GitHub (see below). Support for other Git providers is planned.
- **Supabase:** the first visit to `/admin` opens the setup wizard of the Supabase layer.
  `npm run supabase-types` writes the database types.

## Make it yours

The site is small on purpose: Tailwind CSS, a few components, and no UI library. Every file is a
starting point:

| File                                | What it does                                                                                                |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `app/assets/css/main.css`           | The look, in plain CSS: the colors (light and dark) and the post body (`.pluto-prose`).                     |
| `app/components/SiteNavbar.vue`     | The header: your logo, the site name and the light/dark switch (`ColorModeButton` of Pluto).                |
| `app/components/SiteFooter.vue`     | The footer.                                                                                                 |
| `app/pages/index.vue`               | The home page: the title, the category bar (`CategoryBar.vue`) and the list of posts.                       |
| `app/components/PostList.vue`       | The list of posts (`PostListItem.vue`) with search and pages. The home page and the term pages use it.      |
| `app/pages/categories/[slug].vue`   | The page of a category: its posts. `app/pages/tags/[slug].vue` is the same for a tag.                       |
| `app/pages/tags/index.vue`          | Every tag. The footer links it.                                                                             |
| `app/components/TermChips.vue`      | Tags or categories as links to their pages.                                                                 |
| `app/pages/authors/[slug].vue`      | The page of an author: the avatar, the bio and the posts.                                                   |
| `app/components/AuthorByline.vue`   | The authors under the title of a post. `AuthorBox.vue` shows each author after the post.                    |
| `app/components/AuthorAvatar.vue`   | The avatar of an author: the image, else the initials.                                                      |
| `app/components/PostArticle.vue`    | One post. The post page and the preview of the post editor both use it, so the preview looks like the site. |
| `app/components/PostNavigation.vue` | The newer and the older post, under a post.                                                                 |
| `public/favicon.svg`                | The icon of the site.                                                                                       |

The site name and description come from `websiteName` and `websiteDescription` in `nuxt.config.ts`
(or `NUXT_PUBLIC_WEBSITE_NAME` and `NUXT_PUBLIC_WEBSITE_DESCRIPTION`). The pages read the posts with
the [site composables](https://pluto.vulmix.dev/docs/build/public-api#in-a-nuxt-site) of Pluto:
`usePosts`, `usePost`, `useAdjacentPosts`, `useTags`, `useCategories` and `useAuthor`. An editor also sees a draft on its page, with a
**Draft** badge. Each color of `main.css` is also a Tailwind class (`text-heading`, `text-muted`,
`border-line` and others), so a change of a color changes the whole site. The site
starts in light mode (`colorMode.preference` in `nuxt.config.ts`). The texts are in English, in the
files. For a site in more than one language, see
[Internationalization](https://pluto.vulmix.dev/docs/build/i18n).

### Tags and categories

A post has categories and tags, on both backends. Add them in the side panel of the post editor,
and create a new one from the field. The home page shows the categories as links. Each category
and each tag has a page, `/categories/<slug>` and `/tags/<slug>`, with the posts of the term, search
and pages. `/tags` lists every tag. A post shows its categories above the title and its tags under
the text.

- **Git CMS:** a term is a Markdown file with a `title`, in `content/categories` or
  `content/tags`. The file name is the slug, and a post lists the slugs in its frontmatter
  (`categories:` and `tags:`). The sample post uses `news` and `welcome`.
- **Supabase:** the terms are in the `categories` and `tags` tables. Run the migrations of the
  blog layer from `/admin/migrations`.
- **Static sites:** every term page needs a link on the site, so the build finds it. The home page
  links each category and `/tags` links each tag. A tag with no link has no page in the build.

The admin needs the `terms:manage` capability to create or edit a term.

### Authors

A post has one or more authors, on both backends. An author has a name, a bio and an avatar. Add
them in the side panel of the post editor, and create a new one from the field. A new post gets the
authors that you saved last time. A post shows the authors under its title and a box for each
author after the text. Each author has a page, `/authors/<slug>`, with the bio and the posts.

An author is public once you save it. It has no link to a user account, so no email or role goes to
the site. A guest author or a pen name is a normal author.

- **Git CMS:** an author is a Markdown file with a `name`, a `bio` and an `avatar` (a media id), in
  `content/authors`. The file name is the slug, and a post lists the slugs in its frontmatter
  (`authors:`), in byline order. The sample post uses `editor`: change its name and bio in the admin.
- **Supabase:** the authors are in the `authors` table. Run the migrations of the blog layer from
  `/admin/migrations`.
- **Static sites:** the posts link each author, so the build finds the author pages.

The admin needs the `authors:manage` capability to create or edit an author.

### Components in posts

`app/components/content/Callout.vue` is a content component: a note, a tip or a warning in a box.
The post editor lists it under **Insert a component** (the puzzle icon), and the sample post uses it.
Every file of `app/components/content/` that calls `definePlutoBlock` shows there too. See
[Components in posts](https://pluto.vulmix.dev/docs/extend/author-components#components-in-posts).

### SEO

`create-pluto` asks "Add SEO?" (yes by default). Yes adds
[`@plutocms/seo`](https://pluto.vulmix.dev/docs/layers/seo) to `extends` and `package.json`. To add it
later, install `@plutocms/seo` and add it after `@plutocms/core` in `extends`. With the layer, a post has an SEO
title, an SEO description, a social image and "Hide from search engines", with a search and social
preview in the admin. Each post page gets the head tags (canonical URL, social card, the authors
and a JSON-LD `BlogPosting`), and the site
has `/sitemap.xml`, `/robots.txt` and an RSS feed at `/feed.xml` (the footer links it only with the
layer). The
settings are in `app.config.ts` (`plutoSeo`).

The full URLs need the address of your site: set `NUXT_PUBLIC_WEBSITE_URL` (for example
`https://my-blog.com`). Vercel and Netlify give it, and the GitHub Pages workflow of the admin sets it.

## Go live

Push the project to a GitHub repository and deploy it (for example to Vercel). With the Git CMS,
**Settings → Deploy** in the admin links to each host and sets up GitHub Pages. Then:

- **Git CMS:** open `/admin/login` on the deployed site and select **Create the GitHub App**.
  The page guides you through the rest.
- **Supabase:** set the values of your `.env` (`SUPABASE_URL`, `SUPABASE_KEY`, `DATABASE_URL`) in
  the settings of your host.

**Docs:** [Deploy](https://pluto.vulmix.dev/docs/start-here/deploy) ·
[Supabase](https://pluto.vulmix.dev/docs/supabase) · [Blog layer](https://pluto.vulmix.dev/docs/layers/blog)

## License

MIT
