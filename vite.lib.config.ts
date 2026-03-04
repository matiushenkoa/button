import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

/**
 * Library build config — measures only design system output.
 * React and React-DOM are externalized (peer deps) so they are
 * never bundled into the published package.
 *
 * Run: yarn build:lib
 * Output: dist-lib/
 */
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  css: {
    modules: {
      generateScopedName: '[hash:base64:6]',
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/design-system/index.ts'),
      name: 'DesignSystem',
      fileName: (format) => `design-system.${format}.js`,
      formats: ['es', 'cjs'],
    },
    outDir: 'dist-lib',
    rollupOptions: {
      // Externalize React — consumers supply it; never ship it in the package
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
