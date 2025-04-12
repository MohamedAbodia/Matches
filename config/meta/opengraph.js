import settings from '../settings';

const opengraph = [
  { property: 'og:type', content: 'website' },
  {
    hid: 'og:title',
    property: 'og:title',
    content: settings.title,
  },
  {
    property: 'og:site_name',
    content: settings.title,
  },
  {
    property: 'og:description',
    content: settings.description,
  },
  {
    property: 'og:url',
    content: settings.url,
  },
  {
    property: 'og:image',
    content: settings.imageUrl,
  },
  {
    property: 'og:image:secure_url',
    content: settings.imageUrl,
  },
  { property: 'og:image:width', content: '1200' },
  { property: 'og:image:height', content: '630' },
  {
    property: 'og:image:alt',
    content: settings.imageAlt || settings.description,
  },
  { property: 'og:updated_time', content: new Date().toISOString() },
];

export default opengraph;
