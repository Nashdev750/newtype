import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist', // The output directory for the build files
        rollupOptions: {
            input: 'index.html', // Ensure Vite knows to use index.html as the entry point
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
