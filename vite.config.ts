// @ts-ignore
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// @ts-ignore
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx()
  ],
  server: {
    port: 3002,
    proxy: {
      '/api': {
        target: 'http://localhost:4000'
      }
    }
  },
  resolve: {
    alias: [
      // @ts-ignore
      { find: '@', replacement: path.resolve(__dirname, 'src') }
    ]
  }
})
