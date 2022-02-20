import { join } from 'path'
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
  build: {
    sourcemap: 'inline',
    target: `node${node}`,
    outDir: join(__dirname, '../../dist/build'),
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