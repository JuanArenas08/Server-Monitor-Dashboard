import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Para GitHub Pages (Despliegue) descomentar y usar el nombre del repo:
  // base: '/Server-Monitor-Dashboard/',
})
