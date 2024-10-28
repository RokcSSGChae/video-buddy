import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        dts({ outDir: 'dist/types', insertTypesEntry: true })
    ],
    esbuild: {
        drop: ['console', 'debugger']
    },
    publicDir: false,
    build: {
        lib: {
            entry: resolve(__dirname, 'index.ts'),
            formats: ['es'],
            name: 'shared',
            fileName: (format) => `shared.${format}.js`
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                }
            }
        }
    }
});
