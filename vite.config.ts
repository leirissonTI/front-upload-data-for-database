import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite conexões externas
    port: 5007, // Porta desejada
  },
  preview: {
    port: 5007, // Altere para a porta desejada
  },
  build: {
    outDir: 'dist', // Pasta de saída
    assetsDir: 'assets', // Pasta de assets
    emptyOutDir: true, // Limpa a pasta dist antes do build
    rollupOptions: {
      output: {
        manualChunks: undefined // Para evitar divisão de chunks
      }
    }
  }
})
