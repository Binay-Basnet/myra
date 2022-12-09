import { en } from './en';
import { ne } from './ne';

export const useLocale = (locale: 'en' | 'ne') => {
  const t = locale === 'ne' ? ne : en;
  return { t };
};
