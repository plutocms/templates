// Builds the live demos for GitHub Pages: a static build of each template that
// has a `demo` URL in templates.json, under /templates/<id>/, in `_site/`.
// A demo is fiction: `store/<id>/demo/` is copied over the template first, and
// its `content/` takes the place of the sample content of the template.
// `store/<id>/demo.env` gives the env of the build (the site name). The static
// build writes the answers of the public API to fixed JSON files, so a demo
// needs no backend. A demo is the site only: the admin needs a server.
//
//   node scripts/build-demos.mjs            every demo
//   node scripts/build-demos.mjs blog       one demo

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { parseEnv } from 'node:util'

const PAGES_BASE = '/templates'
const SITE = '_site'

const registry = JSON.parse(fs.readFileSync('templates.json', 'utf8'))
const only = process.argv[2]
const demos = registry.templates.filter(
  (template) => template.demo && (!only || template.id === only)
)

fs.rmSync(SITE, { recursive: true, force: true })
fs.mkdirSync(SITE, { recursive: true })

for (const template of demos) {
  const dir = path.join('templates', template.id)
  const extra = path.join('store', template.id, 'demo')
  const envFile = path.join('store', template.id, 'demo.env')
  // The build works on a copy, so the extra content never reaches the template.
  const work = path.join('.demos', template.id)

  console.log(`::group::${template.id}`)
  fs.rmSync(work, { recursive: true, force: true })
  fs.cpSync(dir, work, {
    recursive: true,
    filter: (source) =>
      !/[\\/](?:node_modules|\.nuxt|\.output|\.data|dist)$/.test(source),
  })
  if (fs.existsSync(path.join(extra, 'content'))) {
    fs.rmSync(path.join(work, 'content'), { recursive: true, force: true })
  }
  if (fs.existsSync(extra)) {
    fs.cpSync(extra, work, { recursive: true })
  }
  const env = fs.existsSync(envFile)
    ? parseEnv(fs.readFileSync(envFile, 'utf8'))
    : {}

  execSync('npx nuxt generate --preset github_pages', {
    cwd: work,
    stdio: 'inherit',
    env: {
      ...process.env,
      ...env,
      PLUTO_BASE_URL: `${PAGES_BASE}/${template.id}/`,
      // The full URL of the demo: the canonical URLs, the sitemap and the feed of @plutocms/seo.
      NUXT_PUBLIC_WEBSITE_URL: template.demo,
    },
  })
  fs.cpSync(path.join(work, '.output', 'public'), path.join(SITE, template.id), {
    recursive: true,
  })
  console.log('::endgroup::')
}

const escape = (text) =>
  text.replace(/[&<>"]/g, (char) => `&#${char.charCodeAt(0)};`)

const items = demos
  .map(
    (template) =>
      `    <li><a href="./${template.id}/">${escape(template.name)}</a><p>${escape(template.description)}</p></li>`
  )
  .join('\n')

fs.writeFileSync(
  path.join(SITE, 'index.html'),
  `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Pluto template demos</title>
  <style>
    body { font: 16px/1.6 system-ui, sans-serif; max-width: 40rem; margin: 4rem auto; padding: 0 1.5rem; color: #27272a; }
    a { color: #09090b; font-weight: 600; }
    li { margin-bottom: 1.5rem; }
    p { margin: 0.25rem 0 0; color: #71717a; }
  </style>
</head>
<body>
  <h1>Pluto template demos</h1>
  <p>Static builds of the <a href="https://github.com/plutocms/templates">Pluto templates</a>: the site only, with fictional content. Start one with <code>npm create pluto@latest</code>.</p>
  <ul>
${items}
  </ul>
</body>
</html>
`
)

console.log(`Built ${demos.length} demo(s) in ${SITE}/.`)
