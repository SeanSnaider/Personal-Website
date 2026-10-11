import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Multi-page build: one HTML entry per page. Add new project pages here.
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        bellydsp: path.resolve(__dirname, 'projects/bellydsp/index.html'),
      },
    },
  },
  server: {
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: true,
    },
  },
})
