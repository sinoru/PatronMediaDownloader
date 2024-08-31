import { resolve } from 'path';
import { defineConfig } from 'vite';

const root = './src'

export default defineConfig(({ command, mode }) => {
  return {
    base: './',
    build: {
      emptyOutDir: true,
      modulePreload: false,
      outDir: resolve(__dirname, 'dist'),
      rollupOptions: {
        input: {
          'background': resolve(__dirname, root, 'background/index.js'),
          'popup': resolve(__dirname, root, 'popup/index.html'),
        },
        output: {
          compact: (() => {
            switch (mode) {
              case 'development':
                return true;
              default:
                return false;
            }
          })(),
          entryFileNames: (chunkInfo) => {
            switch (chunkInfo.name) {
            case 'popup':
              return '[name]/index.js';
            default:
              return '[name].js';
            }
          },
          interop: 'auto',
          manualChunks: (id) => {
            if (id.includes('src/common')) {
              return 'common'
            } else if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
      sourcemap: (() => {
        switch (mode) {
          case 'development':
            return 'inline';
          default:
            return false;
        }
      })(),
      target: [
        'firefox115',
        'safari15',
        'ios15',
        'chrome121',
      ],
    },
    root,
  }
});