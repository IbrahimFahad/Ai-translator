import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'Initial_view.html'),
        results: resolve(__dirname, 'Results_view.html')
      }
    }
  }
});
