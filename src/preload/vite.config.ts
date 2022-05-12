import { join } from 'node:path'
import { builtinModules } from 'module'
import { defineConfig } from 'vite'
import { chrome } from '../target.json'

export default defineConfig({
  mode: process.env.MODE || 'production',
  root: __dirname,
  envDir: process.cwd(),
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
        find: /^@shared$/,
        replacement: join(__dirname, '../shared')
      }
    ]
  },
  build: {
    sourcemap: 'inline',
    target: `chrome${chrome}`,
    outDir: join(__dirname, '../../dist/build'),
    minify: process.env.MODE !== 'development',
    lib: {
      entry: 'preload.ts',
      formats: ['cjs']
    },
    rollupOptions: {
      external: ['electron', ...builtinModules.flatMap(p => [p, `node:${p}`])],
      output: {
        entryFileNames: '[name].js'
      }
    },
    emptyOutDir: false
  }
})
