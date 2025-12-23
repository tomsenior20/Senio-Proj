import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // ✅ REQUIRED
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
