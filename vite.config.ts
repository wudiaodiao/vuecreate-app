import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue(), vueJsx()],
  server: {       //开启本地开发服务器
    host: '0.0.0.0'    
  },
  resolve: {
    alias: {
      '~@': fileURLToPath(new URL('./src', import.meta.url)),
      '@': resolve(__dirname, "./src")
    }
  }
})
