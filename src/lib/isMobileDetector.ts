import isMobile from 'ismobilejs';

export default (): boolean => isMobile(window.navigator.userAgent).any;
