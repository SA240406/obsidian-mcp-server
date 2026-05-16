import { chmod, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const files = ['build/index.js'];

try {
  for (const entry of await readdir('build/scripts')) {
    if (entry.endsWith('.js')) {
      files.push(join('build/scripts', entry));
    }
  }
} catch (error) {
  if (error.code !== 'ENOENT') {
    throw error;
  }
}

await Promise.all(files.map((file) => chmod(file, 0o755)));
