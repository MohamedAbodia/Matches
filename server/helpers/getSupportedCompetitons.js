import path from 'path';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';

const filePath = path.resolve(
  process.env.PLAYWRIGHT_SUPPORTED_COMPETITONS_PATH
);

export function getSupportedCompetitons() {
  try {
    return load(readFileSync(filePath, 'utf8'));
  } catch (error) {
    return error;
  }
}
