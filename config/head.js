import settings from './settings';
import meta from './meta/meta';
import link from './link/link';
import noscript from './noscript/noscript';

const head = {
  title: settings.title,
  htmlAttrs: { lang: settings.lang },
  link,
  meta,
  noscript,
};
export default head;
