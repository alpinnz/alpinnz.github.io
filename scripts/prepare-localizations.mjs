import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const modules = ['about_me', 'footer', 'navbar', 'overview', 'portfolio', 'skills', 'timeline']
const locales = ['en', 'id']

function toLocalizationSource(value) {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) {
    return Object.fromEntries(value.map((entry, index) => [index, toLocalizationSource(entry)]).filter(([, entry]) => entry !== undefined))
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, toLocalizationSource(entry)]).filter(([, entry]) => entry !== undefined))
  }
  return undefined
}

for (const moduleName of modules) {
  const outputDir = join('public', 'localization', moduleName)
  await mkdir(outputDir, { recursive: true })

  for (const locale of locales) {
    const source = JSON.parse(await readFile(join('src', 'data', locale, `${moduleName}.json`), 'utf8'))
    const messages = toLocalizationSource(source)
    const output = { '@@module': moduleName, '@@locale': locale, ...messages }
    await writeFile(join(outputDir, `${locale}.json`), `${JSON.stringify(output, null, 2)}\n`)
  }
}
