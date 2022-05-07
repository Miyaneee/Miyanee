import path from 'path'
import { builtinModules } from 'module'
import eslint from '@nabla/vite-plugin-eslint'
import { node } from '../target.json'

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
  mode: process.env.MODE || 'production',
  root: __dirname,
  envDir: process.cwd(),
  resolve: {
    alias: [
      {
        find: /^@@\/(.*)/,
        replacement: path.join(__dirname, '../..', '$1')
      },
      {
        find: /^@\/(.*)/,
        replacement: path.join(__dirname, '$1')
      },
      {
        find: /^@shared$/,
        replacement: path.join(__dirname, '../shared')
      }
    ]
  },
  build: {
    sourcemap: 'inline',
    target: `node${node}`,
    outDir: path.join(__dirname, '../../dist/build'),
    minify: process.env.MODE !== 'development',
    lib: {
      entry: 'index.js',
      formats: ['cjs']
    },
    rollupOptions: {
      external: ['electron', ...builtinModules.flatMap(p => [p, `node:${p}`])],
      output: {
        entryFileNames: '[name].js'
      }
    },
    emptyOutDir: false
  },
  plugins: [eslint()]
}

export default config
