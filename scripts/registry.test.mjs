import assert from 'node:assert/strict'
import fs from 'node:fs'
import { describe, it } from 'node:test'

// templates.json is the registry that create-pluto and the store read. These
// checks keep it in step with the folders in templates/.

const registry = JSON.parse(fs.readFileSync('templates.json', 'utf8'))
const folders = fs
  .readdirSync('templates', { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)

const BACKENDS = ['git', 'supabase']
const ACCESS = ['free', 'premium']
const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

describe('templates.json', () => {
  it('has version 1', () => {
    assert.equal(registry.version, 1)
  })

  it('lists every folder of templates/ once', () => {
    const ids = registry.templates.map((template) => template.id)
    assert.equal(new Set(ids).size, ids.length, 'an id is listed twice')
    assert.deepEqual([...ids].sort(), [...folders].sort())
  })

  for (const template of registry.templates) {
    describe(template.id, () => {
      it('has an id, a name, a description and a category', () => {
        assert.match(template.id, ID)
        assert.notEqual(template.id, 'none', '"none" is the CLI option with no template')
        for (const key of ['name', 'description', 'category']) {
          assert.equal(typeof template[key], 'string', key)
          assert.ok(template[key].length > 0, key)
        }
      })

      it('points to its own folder', () => {
        assert.ok(ACCESS.includes(template.access))
        if (template.access === 'free') {
          assert.equal(
            template.source,
            `gh:plutocms/templates/templates/${template.id}`
          )
        }
      })

      it('lists known backends, with known changes', () => {
        const backends = Object.entries(template.backends ?? {})
        assert.ok(backends.length > 0, 'no backend')
        for (const [name, changes] of backends) {
          assert.ok(BACKENDS.includes(name), `unknown backend "${name}"`)
          for (const key of Object.keys(changes)) {
            assert.ok(['layer', 'remove'].includes(key), `unknown key "${key}"`)
          }
          for (const path of changes.remove ?? []) {
            assert.ok(
              fs.existsSync(`templates/${template.id}/${path}`),
              `"${path}" is not in the template`
            )
          }
        }
      })

      it('is a Nuxt project that extends a Pluto layer', () => {
        const config = fs.readFileSync(
          `templates/${template.id}/nuxt.config.ts`,
          'utf8'
        )
        assert.match(config, /extends:\s*\[[^\]]*@plutocms\//)
        const pkg = JSON.parse(
          fs.readFileSync(`templates/${template.id}/package.json`, 'utf8')
        )
        assert.equal(pkg.name, `pluto-template-${template.id}`)
      })
    })
  }
})
