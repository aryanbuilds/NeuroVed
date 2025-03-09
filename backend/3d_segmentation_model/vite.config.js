import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  base: './',
  server: {
    port: 3001,
    open: false,
    cors: true
  },
  preview: {
    port : 8088
  }
})