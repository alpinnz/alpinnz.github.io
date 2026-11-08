const themeInitializationScript = `(() => {
  let theme = 'light'

  try {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const savedTheme = localStorage.getItem('site-theme')
    if (savedTheme === 'dark' || savedTheme === 'light') theme = savedTheme
  } catch {
    // Keep the system-derived theme when browser storage is unavailable.
  }

  document.documentElement.dataset.theme = theme
})()`

export function ThemeInitScript(): React.ReactElement {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: themeInitializationScript }}
    />
  )
}
