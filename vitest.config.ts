import { defineConfig } from 'vitest/config';

import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@/src': path.resolve(__dirname, 'src'),
      '@': path.resolve(__dirname, '.'),
      '@/tests': path.resolve(__dirname, 'tests'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['tests/**', 'node_modules/**'],
    setupFiles: ['./vitest.setup.ts'],
  },
});
