import appInfo from './appInfo';
import opengraph from './opengraph';
import facebook from './facebook';
import twitter from './twitter';
import pwa from './pwa';

const meta = [...appInfo, ...opengraph, ...facebook, ...twitter, ...pwa];
export default meta;
