import { join } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { chrome } from '../shared/targets.json'

export default defineConfig({
  root: __dirname,
  base: './',
  resolve: {
    alias: [
      {
        find: /^@@\/(.*)/,
        replacement: join(__dirname, '../..', '$1')
      },
      {
        find: /^@\/(.*)/,
        replacement: join(__dirname, '$1')
      },
      {
        find: /^@shared\/(.*)/,
        replacement: join(__dirname, '../shared', '$1')
      }
    ]
  },
  plugins: [react()],
  build: {
    sourcemap: true,
    target: `chrome${chrome}`,
    outDir: join(__dirname, '../../dist/build'),
    emptyOutDir: true
  }
})
