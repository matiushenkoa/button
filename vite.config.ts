import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
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
      generateScopedName: process.env.NODE_ENV === 'production'
        ? '[hash:base64:6]'
        : '[local]_[hash:base64:5]',
    },
  },
});
