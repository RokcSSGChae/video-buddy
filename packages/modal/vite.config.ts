import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), dts({ include: ['components, index.ts'] })],
    esbuild: {
        drop: ['console', 'debugger']
    },
    publicDir: false,
    build: {
        lib: {
            entry: resolve(__dirname, 'index.ts'),
            formats: ['es'],
            name: 'modal',
            fileName: (format) => `modal.${format}.js`
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                },
                assetFileNames: ({ names }) => {
                    const fileName = names?.at(-1);
                    return fileName?.endsWith('.css') ? 'css/[name][extname]' : '';
                }
            }
        }
    }
});
