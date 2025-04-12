import settings from '../settings';

const manifest = {
  name: settings.title,
  short_name: settings.shortName,
  description: settings.description,
  lang: settings.lang,
  display: 'standalone',
  background_color: '#13171a',
  useWebmanifestExtension: true,
};

export default manifest;
