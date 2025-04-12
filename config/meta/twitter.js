import settings from '../settings';

const twitter = [
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:site', content: settings.twitterHandle },
  {
    property: 'twitter:domain',
    content: settings.url,
  },
  {
    property: 'twitter:url',
    content: settings.url,
  },
  {
    hid: 'twitter:title',
    property: 'twitter:title',
    content: settings.title,
  },
  {
    hid: 'twitter:description',
    property: 'twitter:description',
    content: settings.description,
  },
  {
    hid: 'twitter:image',
    name: 'twitter:image',
    content: settings.imageUrl,
  },
  {
    hid: 'twitter:image:alt',
    name: 'twitter:image:alt',
    content: settings.imageAlt || settings.description,
  },
];

export default twitter;
