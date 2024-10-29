import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { babel } from '@rollup/plugin-babel';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        dts({ outDir: 'dist/types', insertTypesEntry: true })
    ],
    esbuild: {
        drop: ['console', 'debugger']
    },
    publicDir: false,
    build: {
        lib: {
            entry: resolve(__dirname, './src/index.ts'),
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
            },
            plugins: [
                babel({
                    babelHelpers: 'bundled',
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: {
                                    browsers: [
                                        'last 3 major versions',
                                        'Firefox ESR',
                                        'Chrome >= 53',
                                        'not dead',
                                        'not ie 11',
                                        'not baidu 7',
                                        'not and_qq 11',
                                        'not and_uc 12',
                                        'not op_mini all'
                                    ]
                                }
                            }
                        ]
                    ],
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                    exclude: 'node_modules/**'
                })
            ]
        }
    }
});
