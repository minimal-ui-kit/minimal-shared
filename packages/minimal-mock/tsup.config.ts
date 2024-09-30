import { defineConfig } from 'tsup';

import { preserveDirectivesPlugin } from './plugins/preserve-directives';

// ----------------------------------------------------------------------

export default defineConfig({
  entry: ['src/index.ts', 'src/**/index.ts'],
  dts: true,
  outDir: 'dist',
  clean: true,
  format: ['esm'],
  splitting: false,
  metafile: true,
  esbuildPlugins: [
    preserveDirectivesPlugin({
      directives: ['use client', 'use strict'],
      include: /\.(js|ts|jsx|tsx)$/,
      exclude: /node_modules/,
    }),
  ],
  // minifySyntax: true,
  // cjsInterop: true,
  // minifyIdentifiers: true,
  // minifyWhitespace: true,
  // treeshake: true,
  // keepNames: true,
  // minify: true,
});
