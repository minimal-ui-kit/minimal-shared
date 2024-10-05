import type { Loader, Plugin } from 'esbuild';

import path from 'node:path';
import fs from 'node:fs/promises';

/**
 * Solution from
 * https://github.com/Seojunhwan/esbuild-plugin-preserve-directives/tree/main
 */

export interface DirectivePreservationOptions {
  directives: string[];
  include: RegExp;
  exclude: RegExp;
}

function getRelativePath(targetPath: string): string {
  return path.relative(process.cwd(), targetPath);
}

async function readFileContents(filePath: string): Promise<string> {
  return fs.readFile(filePath, 'utf8');
}

function updateFileContents(file: any, relevantDirectives: Set<string>): void {
  if (relevantDirectives.size > 0) {
    const directiveString = Array.from(relevantDirectives).join('\n') + '\n\n';
    file.contents = Buffer.from(directiveString + file.text);
  }
}

function extractDirectives(lines: string[], directives: string[]): string[] {
  return lines
    .slice(0, 5)
    .filter((line) =>
      directives.some(
        (directive) =>
          line.trim().startsWith(`"${directive}"`) ||
          line.trim().startsWith(`'${directive}'`) ||
          line.trim().startsWith(`\`${directive}\``)
      )
    );
}

// ----------------------------------------------------------------------

export function preserveDirectivesPlugin(options: DirectivePreservationOptions): Plugin {
  const { directives, exclude, include } = options;

  return {
    name: 'plugin-preserve-directives',
    setup(build) {
      const fileDirectives = new Map<string, string[]>();

      build.onLoad({ filter: include }, async (args) => {
        if (exclude.test(args.path)) {
          return null;
        }

        const contents = await readFileContents(args.path);
        const lines = contents.split('\n');
        const foundDirectives = extractDirectives(lines, directives);

        if (foundDirectives.length > 0) {
          const relativePath = getRelativePath(args.path);
          fileDirectives.set(relativePath, foundDirectives);
        }

        return {
          contents,
          loader: path.extname(args.path).slice(1) as Loader,
        };
      });

      build.onEnd(async (result) => {
        if (result.errors.length > 0) return;

        const outputs = result.outputFiles || [];

        for (const file of outputs) {
          const relevantDirectives = new Set<string>();

          if (!result.metafile) {
            const fileContent = file.text;
            for (const [filePath, directives] of fileDirectives) {
              if (fileContent.includes(filePath)) {
                directives.forEach((d) => relevantDirectives.add(d));
              }
            }
          } else {
            const relativePath = getRelativePath(file.path);
            const meta = result.metafile.outputs[relativePath];

            if (!meta) {
              continue;
            }

            for (const input of Object.keys(meta.inputs)) {
              const directives = fileDirectives.get(input);
              if (directives) {
                directives.forEach((d) => relevantDirectives.add(d));
              }
            }
          }

          updateFileContents(file, relevantDirectives);
        }
      });
    },
  };
}
