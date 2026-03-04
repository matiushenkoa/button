import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.test.{ts,tsx}',
        '**/*.config.{ts,js}',
        '**/*.scss',
        '**/*.css',
        'dist/',
        'src/main.tsx',
        'src/assets/',
        'src/design-system/icons/',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 65,
        statements: 80,
      },
    },
  },
});
