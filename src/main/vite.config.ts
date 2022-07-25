import { join } from 'node:path'
import { builtinModules } from 'node:module'
import { defineConfig } from 'vite'
import { node } from '../shared/targets.json'
import { dependencies } from '../../package.json'

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
    target: `node${node}`,
    outDir: join(__dirname, '../../dist/build'),
    minify: true,
    lib: {
      entry: 'index.ts',
      formats: ['cjs']
    },
    rollupOptions: {
      external: [
        'electron',
        ...Object.keys(dependencies),
        ...builtinModules.flatMap(name => [name, `node:${name}`])
      ],
      output: {
        entryFileNames: '[name].js'
      }
    },
    emptyOutDir: false
  }
})
