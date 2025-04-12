import path from 'path';
import { getDate } from './getDate';
import { isProduction } from './isProduction';
import { pathToFileURL } from 'url';

const samplePagePath = process.env.PLAYWRIGHT_SAMPLE_PAGE_PATH;

if (!samplePagePath && !isProduction()) {
  throw new Error('PLAYWRIGHT_SAMPLE_PAGE_PATH is not defined in development environment');
}

const samplePage = samplePagePath ? pathToFileURL(path.resolve(samplePagePath)).href : null;

export function getPageLink() {
  const { en } = getDate().today();
  const liveOnSatLink = 'https://liveonsat.com/2day.php';
  const todaysLink = `${liveOnSatLink}?start_dd=${en.day}&start_mm=${en.month}&start_yyyy=${en.year}&end_dd=${en.day}&end_mm=${en.month}&end_yyyy=${en.year}`;
  const result = isProduction() ? todaysLink : samplePage;
  console.log('getPageLink result:', result);
  return result;
}