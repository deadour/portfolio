import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { renderPage } from './src/head'
import { fileFor, parseRoute, routes } from './src/route'

// One HTML file per language (/ and /es/), each with its own lang attribute and meta tags.
// The app itself is the same bundle; it reads the language from the URL.
function routePages(): Plugin {
  return {
    name: 'route-pages',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      // Dev server: the requested URL picks the language. Build: this is the English page.
      handler: (html, ctx) => renderPage(html, parseRoute(ctx.originalUrl?.split(/[?#]/)[0] ?? '/')),
    },
    generateBundle(_, bundle) {
      const index = bundle['index.html']
      if (!index || index.type !== 'asset') return
      const html = String(index.source)
      for (const route of routes) {
        const fileName = fileFor(route)
        if (fileName !== 'index.html') this.emitFile({ type: 'asset', fileName, source: renderPage(html, route) })
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), routePages()],
})
