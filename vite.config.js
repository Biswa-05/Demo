import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Set base to './' for static hosting or specify your subdirectory if needed
  base: './',
})
