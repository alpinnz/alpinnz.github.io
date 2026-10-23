import { useLocalization } from '@valfuse-node/react'
import en from '@/data/en'

type SiteModule = keyof typeof en

function localizeNode<T>(value: T, key: string, translate: (key: string) => string): T {
  if (typeof value === 'string') return translate(key) as T
  if (Array.isArray(value)) {
    return value.map((entry, index) => localizeNode(entry, `${key}.${index}`, translate)) as T
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([name, entry]) => [name, localizeNode(entry, `${key}.${name}`, translate)]),
    ) as T
  }
  return value
}

export function useLocalizedModule<TModule extends SiteModule>(moduleName: TModule): (typeof en)[TModule] {
  const { translate } = useLocalization()
  return localizeNode(en[moduleName], moduleName, translate)
}
