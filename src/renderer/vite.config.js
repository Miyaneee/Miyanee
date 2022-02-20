import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from '@nabla/vite-plugin-eslint'
import path, { join } from 'node:path'
import { chrome } from '../target.json'

export default defineConfig({
  root: __dirname,
  base: './',
  resolve: {
    alias: [
      {
        find: /@\/(.*)/,
        replacement: path.join(__dirname, '$1')
      }
    ]
  },
  plugins: [react(), eslint()],
  server: {
    port: process.env.VITE_PORT
  },
  build: {
    sourcemap: true,
    target: `chrome${chrome}`,
    outDir: join(__dirname, '../../dist/build'),
    emptyOutDir: true
  }
})
