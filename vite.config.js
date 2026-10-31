import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;

          if (id.includes('react')) return 'react-vendor';
          if (id.includes('bootstrap-icons')) return 'icons';
          if (id.includes('@tailwindcss')) return 'tailwind';

          return 'vendor';
        },
      },
    },
  },
});
