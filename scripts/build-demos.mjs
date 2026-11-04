// Builds the live demos for GitHub Pages: a static build of each template that
// has a `demo` URL in templates.json, under /templates/<id>/, in `_site/`.
// `store/<id>/demo/` is copied over the template first (more sample content).
// A demo is the site only: the admin needs a server.
//
//   node scripts/build-demos.mjs            every demo
//   node scripts/build-demos.mjs blog       one demo

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

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
  // The build works on a copy, so the extra content never reaches the template.
  const work = path.join('.demos', template.id)

  console.log(`::group::${template.id}`)
  fs.rmSync(work, { recursive: true, force: true })
  fs.cpSync(dir, work, {
    recursive: true,
    filter: (source) =>
      !/[\\/](?:node_modules|\.nuxt|\.output|\.data|dist)$/.test(source),
  })
  if (fs.existsSync(extra)) {
    fs.cpSync(extra, work, { recursive: true })
  }

  execSync('npx nuxt generate --preset github_pages', {
    cwd: work,
    stdio: 'inherit',
    env: { ...process.env, PLUTO_BASE_URL: `${PAGES_BASE}/${template.id}/` },
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
  <p>Static builds of the <a href="https://github.com/plutocms/templates">Pluto templates</a>: the site only, with sample content. Start one with <code>npm create pluto@latest</code>.</p>
  <ul>
${items}
  </ul>
</body>
</html>
`
)

console.log(`Built ${demos.length} demo(s) in ${SITE}/.`)
