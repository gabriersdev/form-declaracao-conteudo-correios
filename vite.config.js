import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/form-declaracao-conteudo-correios/',
  plugins: [react()],
})
