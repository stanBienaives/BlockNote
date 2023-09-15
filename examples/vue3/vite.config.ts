import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      // Comment out the lines below to load a built version of blocknote
      // or, keep as is to load live from sources with live reload working
      "@blocknote/core": path.resolve(
        __dirname,
        "../../packages/core/src/"
      ),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

