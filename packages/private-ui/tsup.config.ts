import path from 'path';
import fs from 'fs-extra';
import glob from 'fast-glob';
import { defineConfig } from 'tsup';

// ----------------------------------------------------------------------

const excludedFiles = ['!src/**/*.d.ts', '!src/**/*.css'];
const copyFiles = ['src/**/index.ts', 'src/**/*.css'];

export default defineConfig((options) => ({
  dts: true,
  clean: true,
  outDir: 'dist',
  format: ['esm'],
  splitting: false,
  sourcemap: false,
  minify: !options.watch,
  entry: ['src/**/*', ...excludedFiles],
  onSuccess: async () => {
    try {
      // Copy all index.ts files from src to dist
      const srcIndexTsFiles: string[] = glob.sync(copyFiles);

      await Promise.all(
        srcIndexTsFiles.map(async (file) => {
          const dest = path.join('dist', path.relative('src', file)).replace('.ts', '.js');
          await fs.copy(file, dest);
        })
      );

      console.log('>> Files copied successfully!');
    } catch (error) {
      console.error('>> Error during onSuccess:', error);
    }
  },
}));
