import { join } from 'node:path'
import { builtinModules } from 'module'
import { defineConfig } from 'vite'
import { chrome } from '../shared/targets.json'

export default defineConfig({
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
        find: /^@shared\/(.*)/,
        replacement: join(__dirname, '../shared', '$1')
      }
    ]
  },
  build: {
    sourcemap: 'inline',
    target: `chrome${chrome}`,
    outDir: join(__dirname, '../../dist/build'),
    minify: true,
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
