import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [
      react(),
      // Tailwind v4 plugin often returns Plugin[] instead of Plugin
      // This type assertion silences the inspection error safely
      tailwindcss() as any,
    ],

    // ✅ Correct base path for your repo (luvbytez)
    base: '/luvbytez/',

    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    server: {
      // Keep this as-is for Google AI Studio
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});