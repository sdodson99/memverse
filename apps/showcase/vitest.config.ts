import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    css: true,
    include: ['./src/**/*.test.[jt]s?(x)'],
    setupFiles: [
      './test/integration/mock-server-only.ts',
      './test/integration/mock-youtube-member-querier.ts',
      './test/integration/mock-firebase-admin.ts',
      './test/integration/mock-pixi.ts',
    ],
  },
});
