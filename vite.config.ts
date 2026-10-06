import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative paths so the build also works under a sub-path (e.g. username.github.io/portfolio).
  base: './',
  plugins: [react(), tailwindcss()],
})
