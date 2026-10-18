import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  // Served from https://eldalatony.github.io/Portofolio/
  base: '/Portofolio/',
  plugins: [react(), tailwindcss()],
})
