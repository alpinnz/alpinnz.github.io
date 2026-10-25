import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const modules = ['about_me', 'footer', 'navbar', 'overview', 'portfolio', 'skills', 'timeline']
const locales = ['en', 'id']
const staleFiles = []

function toLocalizationSource(value) {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) {
    return Object.fromEntries(value
      .map((entry, index) => [index, toLocalizationSource(entry)])
      .filter(([, entry]) => entry !== undefined))
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value)
      .map(([key, entry]) => [key, toLocalizationSource(entry)])
      .filter(([, entry]) => entry !== undefined))
  }
  return undefined
}

for (const moduleName of modules) {
  for (const locale of locales) {
    const sourcePath = join('src', 'data', locale, `${moduleName}.json`)
    const outputPath = join('public', 'localization', moduleName, `${locale}.json`)
    const source = JSON.parse(await readFile(sourcePath, 'utf8'))
    const messages = toLocalizationSource(source)
    const expected = `${JSON.stringify({ '@@module': moduleName, '@@locale': locale, ...messages }, null, 2)}\n`
    const actual = await readFile(outputPath, 'utf8').catch(() => null)
    const normalizedActual = actual?.replace(/\r\n/g, '\n')

    if (normalizedActual !== expected) staleFiles.push(outputPath)
  }
}

if (staleFiles.length > 0) {
  console.error('Generated localization files are stale. Run npm run localization:generate:')
  for (const file of staleFiles) console.error(`- ${file}`)
  process.exitCode = 1
} else {
  console.log('Generated localization files match src/data.')
}
