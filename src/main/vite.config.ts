import { join } from 'path'
import { builtinModules } from 'module'
import { defineConfig } from 'vite'
import { node } from '../target.json'

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
    target: `node${node}`,
    outDir: join(__dirname, '../../dist/build'),
    minify: process.env.MODE !== 'development',
    lib: {
      entry: 'index.ts',
      formats: ['cjs']
    },
    rollupOptions: {
      external: [
        'electron',
        'compressing',
        'electron-store',
        'os-proxy-config',
        'https-proxy-agent',
        ...builtinModules.flatMap(p => [p, `node:${p}`])
      ],
      output: {
        entryFileNames: '[name].js'
      }
    },
    emptyOutDir: false
  }
})
