import settings from '../settings';

const appInfo = [
  { hid: 'author', name: 'author', content: settings.author },
  {
    hid: 'description',
    name: 'description',
    content: settings.description,
  },
  {
    hid: 'keywords',
    property: 'keywords',
    keywords: settings.keywords,
  },
];

export default appInfo;
