import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { describe, it } from 'node:test'
import { parse } from 'yaml'

// The fictional content of the live demos (store/<id>/demo/). A post with bad
// frontmatter is not in the demo, so each file must parse, and each cover must
// point to a media record and its file.

const registry = JSON.parse(fs.readFileSync('templates.json', 'utf8'))

function frontmatter(file) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(fs.readFileSync(file, 'utf8'))
  assert.ok(match, `${file} has no frontmatter`)
  return parse(match[1])
}

for (const template of registry.templates.filter((entry) => entry.demo)) {
  const demo = path.join('store', template.id, 'demo')
  const posts = path.join(demo, 'content', 'posts')

  describe(`the ${template.id} demo`, () => {
    it('has a site name in demo.env', () => {
      const env = fs.readFileSync(path.join('store', template.id, 'demo.env'), 'utf8')
      assert.match(env, /^NUXT_PUBLIC_WEBSITE_NAME=.+/m)
    })

    const fixturePath = path.join(demo, 'demo-fixture.json')
    if (fs.existsSync(fixturePath)) {
      it('has a fixture in the shape of the public index, with each photo on disk', () => {
        const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'))
        for (const [type, entry] of Object.entries(fixture.types)) {
          assert.equal(typeof entry.titleField, 'string', type)
          assert.ok(entry.items.length > 0, `${type} has no items`)
          for (const item of entry.items) {
            assert.equal(typeof item[entry.titleField], 'string', `${type} ${item.id}`)
            for (const media of item.media ?? []) {
              assert.ok(fs.existsSync(path.join(demo, 'public', media.url)), media.url)
              assert.ok(media.alt, `${media.url} has no alt text`)
            }
          }
        }
      })
    }

    if (!fs.existsSync(posts)) {
      return
    }
    for (const name of fs.readdirSync(posts)) {
      it(`${name}: is a published post with a cover on disk`, () => {
        const post = frontmatter(path.join(posts, name))
        assert.equal(typeof post.title, 'string')
        assert.equal(post.status, 'published')
        if (post.cover !== undefined) {
          const record = frontmatter(
            path.join(demo, 'content', 'media', `${post.cover}.md`)
          )
          assert.ok(fs.existsSync(path.join(demo, record.file)), record.file)
          assert.ok(record.alt, 'the cover has no alt text')
        }
      })
    }
  })
}
