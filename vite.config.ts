import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
import px2rem from 'postcss-px2rem'


// 配置基本大小
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 16
})


export default defineConfig({
  base: './',
  plugins: [vue(), vueJsx()],
  server: {       //开启本地开发服务器
    host: '0.0.0.0'    
  },
  css: {
    postcss: {
      plugins: [postcss]
    }
  },
  resolve: {
    alias: {
      '~@': fileURLToPath(new URL('./src', import.meta.url)),
      '@': resolve(__dirname, "./src")
    }
  }
})
