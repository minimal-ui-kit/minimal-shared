import { defineConfig } from 'tsup';

// ----------------------------------------------------------------------

export default defineConfig((options) => ({
  dts: true,
  clean: true,
  outDir: 'dist',
  format: ['cjs', 'esm'],
  splitting: false,
  sourcemap: false,
  minify: !options.watch,
  entry: ['src/**/*', '!src/**/*.test.*'],
}));
