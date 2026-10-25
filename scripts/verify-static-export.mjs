import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { join } from 'node:path'

const pages = [
  {
    path: join('out', 'index.html'),
    language: 'en',
    canonical: 'https://alpinnz.github.io/',
    alternate: 'https://alpinnz.github.io/id/',
  },
  {
    path: join('out', 'id', 'index.html'),
    language: 'id',
    canonical: 'https://alpinnz.github.io/id/',
    alternate: 'https://alpinnz.github.io/',
  },
]

for (const page of pages) {
  const html = await readFile(page.path, 'utf8')
  assert.match(html, new RegExp(`<html[^>]+lang="${page.language}"`), `${page.path} should declare its language`)
  assert.ok(html.includes(`<link rel="canonical" href="${page.canonical}"`), `${page.path} should have its canonical URL`)
  assert.ok(html.includes(`hrefLang="${page.language === 'en' ? 'id' : 'en'}" href="${page.alternate}"`), `${page.path} should link to its translated page`)
  assert.ok(html.includes('application/ld+json'), `${page.path} should include structured data`)
  assert.ok(html.includes('property="og:image"'), `${page.path} should include an Open Graph image`)
  assert.ok(html.includes('name="twitter:image"'), `${page.path} should include a Twitter image`)

  const socialImageUrls = [...html.matchAll(/<meta (?:property="og:image"|name="twitter:image") content="([^"]+)"/g)]
  assert.equal(socialImageUrls.length, 2, `${page.path} should include both social images`)
  for (const [, imageUrl] of socialImageUrls) {
    await access(join('out', new URL(imageUrl).pathname.slice(1)))
  }
}

const sitemap = await readFile(join('out', 'sitemap.xml'), 'utf8')
assert.ok(sitemap.includes('https://alpinnz.github.io/'), 'Sitemap should include the English page')
assert.ok(sitemap.includes('https://alpinnz.github.io/id/'), 'Sitemap should include the Indonesian page')

console.log('Static export contains localized pages, canonical URLs, and language alternates.')
