import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        'electron',
        'sql.js',
        'bcryptjs',
        'uuid',
        'electron-squirrel-startup',
        'path',
        'fs',
        'https',
        'http',
        'node:path',
        'node:fs',
        'node:https'
      ]
    }
  }
});
