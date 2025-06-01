import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ], 
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:6543', // Alamat backend Pyramid Anda
        changeOrigin: true,
        // Anda bisa menambahkan 'rewrite' di sini jika diperlukan,
        // contoh: rewrite: (path) => path.replace(/^\/api/, '/api')
        // Namun, berdasarkan permintaan Anda, saya tidak menambahkannya.
      },
      '/static': { // Proxy untuk request ke /static
        target: 'http://localhost:6543', // Alamat backend Pyramid Anda
        changeOrigin: true,
        // Jika path di backend berbeda, Anda mungkin perlu rewrite, contoh:
        // rewrite: (path) => path.replace(/^\/static/, '/static') 
      }
    }
  }
})