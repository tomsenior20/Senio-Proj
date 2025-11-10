import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,   // 👈 Expose to network
    port: 5173    // 👈 Ensure correct port
  }
})
