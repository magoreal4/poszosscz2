const path = require('path');
const { defineConfig } = require('vite')
module.exports = defineConfig({
    build: {
        outDir: path.resolve(__dirname, '../../static/js'),
        minify: false,
        rollupOptions: {
            input: './js/index-mapa-admin.js',
            output: {
                entryFileNames: 'mapa-admin.js',
                format: 'iife',
              },
        }
    }
});

