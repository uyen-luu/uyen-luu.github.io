import { defineConfig } from 'vitest/config';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import angular from '@analogjs/vite-plugin-angular';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [angular()],
  resolve: {
    alias: {
      '@app': resolve(__dirname, './src/app'),
      '@environment/': resolve(__dirname, './src/environments/'),
      '@assets': resolve(__dirname, './src/assets'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    passWithNoTests: true,
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.spec.ts'],
    reporters: ['verbose', 'github-actions'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/app/**/*.ts'],
      exclude: ['src/app/**/*.spec.ts'],
    },
  },
});
